require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(process.env.STRIPE_SECRETE);
const app = express();
const port = process.env.PORT || 3000;

// middleware
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("plant server!");
});

const uri = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@ac-pr6dsoo-shard-00-00.iz3zu0d.mongodb.net:27017,ac-pr6dsoo-shard-00-01.iz3zu0d.mongodb.net:27017,ac-pr6dsoo-shard-00-02.iz3zu0d.mongodb.net:27017/?ssl=true&replicaSet=atlas-1026ed-shard-0&authSource=admin&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    // create the colletion in DB
    const plantCollection = client.db("LeaforiaDB").collection("plants");
    const userCollection = client.db("LeaforiaDB").collection("users");
    const paymentCollection = client.db("LeaforiaDB").collection("payments");

    // user related API

    // get all user
    app.get("/users", async (req, res) => {
      const result = await userCollection.find().toArray();
      res.send(result);
    });

    // get the user role from database
    app.get("/users/:email/role", async (req, res) => {
      const email = req.params.email;

      const user = await userCollection.findOne({ email });

      if (!user) {
        return res.send({ role: "user" }); // fallback
      }

      res.send({ role: user.role });
    });

    // user data add in database
    app.post("/users", async (req, res) => {
      const users = req.body;
      const query = { email: users.email };

      // Logic to check if user email is already present
      const isExist = await userCollection.findOne(query);
      if (isExist) {
        return res.send({ message: "user already exists", insertedId: null });
      }
      const newUser = {
        ...users,
        role: "user", // always user by default
      };
      const result = await userCollection.insertOne(newUser);
      res.send(result);
    });

    // delete user from database
    app.delete("/user/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await userCollection.deleteOne(query);
      res.send(result);
    });

    // get plant data from database to ui
    app.get("/plants", async (req, res) => {
      const result = await plantCollection.find().toArray();
      res.send(result);
    });

    // get a plant info from database
    app.get("/plants/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const plant = await plantCollection.findOne(query);

      // Get related plants (same category, exclude current)
      const relatedPlants = await plantCollection
        .find({
          category: plant.category,
          _id: { $ne: plant._id },
        })

        .toArray();

      res.send({ plant, relatedPlants });
    });

    // plant data add in database
    app.post("/plants", async (req, res) => {
      const plants = req.body;
      const result = await plantCollection.insertOne(plants);
      res.send(result);
    });

    // edit plant data from database
    app.patch("/plants/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const updatedPlant = req.body;
      const updatedDoc = {
        $set: updatedPlant,
      };

      const result = await plantCollection.updateOne(filter, updatedDoc);
      res.send(result);
    });

    // delete plant from database
    app.delete("/plants/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };

      const result = await plantCollection.deleteOne(query);
      res.send(result);
    });

    // payment related API
    // get all the payment that status is paid (customer pay the price)
    app.get("/admin/manage-orders", async (req, res) => {
      const result = await paymentCollection
        .find({ paymentStatus: "paid", status: "In Progress" })
        .toArray();
      res.send(result);
    });

    // get all the deliveries that completed
    app.get("/admin/deliveries", async (req, res) => {
      const result = await paymentCollection
        .find({ status: "Delivered" })
        .toArray();
      res.send(result);
    });

    app.get("/active-order/:email", async (req, res) => {
      const email = req.params.email;
      // Look for the most recent order that is still "In Progress"
      const order = await paymentCollection.findOne(
        { customer_email: email, status: "In Progress" },
        { sort: { paidAt: -1 } },
      );
      res.send(order); // Returns null if no "In Progress" orders found
    });

    app.get("/my-payments", async (req, res) => {
      const email = req.query.email;

      const result = await paymentCollection
        .find({ customer_email: email })
        .sort({ paidAt: -1 })
        .toArray();

      res.send(result);
    });

    app.post("/create-checkout-session", async (req, res) => {
      const paymentInfo = req.body;
      const amount = parseInt(paymentInfo.price) * 100;
      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            price_data: {
              currency: "usd",
              unit_amount: amount,
              product_data: {
                name: paymentInfo.plantName,
              },
            },

            quantity: paymentInfo.quantity,
          },
        ],

        customer_email: paymentInfo.email,
        mode: "payment",
        metadata: {
          plantId: paymentInfo.plantId,
          plantName: paymentInfo.plantName,
          quantity: paymentInfo.quantity,
          userName: paymentInfo.userName,
        },
        success_url: `${process.env.SITE_DOMAIN}/dashboard/payment-success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.SITE_DOMAIN}/dashboard/payment-canceled`,
      });

      res.send({ url: session.url });
    });

    app.patch("/payment-success", async (req, res) => {
      const sessionId = req.query.session_id;
      if (!sessionId) return res.status(400).send({ message: "No session ID" });
      const session = await stripe.checkout.sessions.retrieve(sessionId);
      if (session.payment_status === "paid") {
        // Check if this transaction was already recorded (prevents duplicates on refresh)
        const existingPayment = await paymentCollection.findOne({
          transactionId: session.payment_intent,
        });

        if (existingPayment) {
          return res.send(existingPayment);
        }

        const payment = {
          amount: session.amount_total / 100,
          currency: session.currency,
          customer_email: session.customer_email,
          userName: session.metadata.userName,
          plantId: session.metadata.plantId,
          plantName: session.metadata.plantName,
          quantity: parseInt(session.metadata.quantity),
          transactionId: session.payment_intent,
          paymentStatus: "paid",
          status: "In Progress",
          paidAt: new Date(),
        };

        const resultPayment = await paymentCollection.insertOne(payment);
        // Update the plant stock if necessary
        await plantCollection.updateOne(
          { _id: new ObjectId(session.metadata.plantId) },
          { $inc: { availableStock: -parseInt(session.metadata.quantity) } },
        );
        res.send({ ...payment, _id: resultPayment.insertedId });
      }
    });

    app.patch("/orders/approve/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const updateDoc = { $set: { status: "Delivered" } };
      const result = await paymentCollection.updateOne(filter, updateDoc);
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!",
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log(`Plant will grow on port ${port}`);
});
