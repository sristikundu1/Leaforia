require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(process.env.STRIPE_SECRETE);
const app = express();
const port = process.env.PORT || 3000;

const admin = require("firebase-admin");

const serviceAccount = require("./leaforia-firebase-adminsdk.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// middleware
app.use(cors());
app.use(express.json());

const verifyFBToken = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).send({ message: "unauthorized access" });
  }

  try {
    const idToken = token.split(" ")[1];
    const decoded = await admin.auth().verifyIdToken(idToken);
    req.decoded_email = decoded.email;
    next();
  } catch (err) {
    return res.status(401).send({ message: "unauthorized access" });
  }
};

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
    const articleCollection = client.db("LeaforiaDB").collection("articles");

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

    // update user info
    app.patch("/users/:email", async (req, res) => {
      const email = req.params.email;
      const { name, photo } = req.body;
      const filter = { email: email };
      const updatedDoc = {
        $set: {
          name: name,
          photo: photo,
        },
      };
      const result = await userCollection.updateOne(filter, updatedDoc);
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

    // article related API

    app.get("/articles", async (req, res) => {
      const result = await articleCollection.find().toArray();
      res.send(result);
    });

    app.get("/articles/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await articleCollection.findOne(query);
      res.send(result);
    });

    app.post("/articles", async (req, res) => {
      const article = req.body;
      const result = await articleCollection.insertOne(article);
      res.send(result);
    });

    // update /add comment in the db
    app.patch("/articles/:id/comment", async (req, res) => {
      const id = req.params.id;
      const comment = req.body; // { userName, text, userImage, date }

      const filter = { _id: new ObjectId(id) };
      const updateDoc = {
        $push: { comments: comment }, // $push adds the object to the array
      };

      const result = await articleCollection.updateOne(filter, updateDoc);
      res.send(result);
    });

    // dashboard admin data
    app.get("/admin-stats", async (req, res) => {
      const users = await userCollection.countDocuments();
      const payments = await paymentCollection.find().toArray();

      // Using simple logic or MongoDB Aggregation Pipeline
      const approved = await paymentCollection.countDocuments({
        status: "Delivered",
      });
      const pending = await paymentCollection.countDocuments({
        status: "In Progress",
      });
      const revenue = payments.reduce((sum, payment) => sum + payment.price, 0);

      res.send({ users, approved, pending, revenue });
    });

    // GET user-specific statistics
    app.get("/user-stats/:email", async (req, res) => {
      const email = req.params.email;

      try {
        const anyRecord = await paymentCollection.findOne({ email: email });

        const stats = await paymentCollection
          .aggregate([
            {
              $match: {
                customer_email: email,
                status: "Delivered", // Only count successful deliveries
              },
            },
            {
              $group: {
                _id: null,
                purchaseCount: { $sum: 1 }, // Counts the documents
                totalSpent: { $sum: "$amount" }, // Sums the 'amount' field
              },
            },
          ])
          .toArray();

        // If no records found, return zeros
        const result =
          stats.length > 0 ? stats[0] : { purchaseCount: 0, totalSpent: 0 };

        res.send({
          purchaseCount: result.purchaseCount,
          totalSpent: result.totalSpent,
          userLevel: result.purchaseCount >= 5 ? "Pro Gardener" : "Seedling",
          badges: result.purchaseCount > 0 ? ["First Bloom"] : [],
          communityRank: "Top 20%",
        });
      } catch (error) {
        console.error("Stats Error:", error);
        res.status(500).send({ message: "Error fetching statistics" });
      }
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

    app.get("/active-order/:email", verifyFBToken, async (req, res) => {
      const email = req.params.email;

      // check eail address
      if (email !== req.decoded_email) {
        return res.status(403).send({ message: "forbidden access" });
      }
      // Look for the most recent order that is still "In Progress"
      const order = await paymentCollection.findOne(
        { customer_email: email, status: "In Progress" },
        { sort: { paidAt: -1 } },
      );
      res.send(order); // Returns null if no "In Progress" orders found
    });

    app.get("/my-payments", verifyFBToken, async (req, res) => {
      const email = req.query.email;

      // check email address
      if (email !== req.decoded_email) {
        return res.status(403).send({ message: "forbidden access" });
      }

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
