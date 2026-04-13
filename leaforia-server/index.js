require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");
const express = require("express");
const cors = require("cors");

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

    // user related API

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

    // get plant data from database to ui
    app.get("/plants", async (req, res) => {
      const result = await plantCollection.find().toArray();
      res.send(result);
    });

    // plant data add in database
    app.post("/plants", async (req, res) => {
      const plants = req.body;
      const result = await plantCollection.insertOne(plants);
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
