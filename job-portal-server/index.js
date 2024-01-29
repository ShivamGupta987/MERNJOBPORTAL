const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;
require("dotenv").config();

// middleware

app.use(express.json());
app.use(cors());

// user: sg804595
// pass :ynocIsyGB7MUVQDg

// mongodb

const { MongoClient, ServerApiVersion,ObjectId } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@job-portal-demo.jouxbiv.mongodb.net/?retryWrites=true&w=majority`;

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
    await client.connect();

    // create db

    const db = client.db("mernJobPortal");
    const jobsCollections = db.collection("demoJobs");

    // post jobs

    app.post("/post-job", async (req, res) => {
      const body = req.body;
      body.createAt = new Date();
      // console.log(body);
      const result = await jobsCollections.insertOne(body);
      if (result.insertedId) {
        return res.status(200).send(result);
      }else{
        return res.status(404).send({
          message : "cannot insert! try again later",
          status : false
        }) 
      }
    });

    // get all jobs

    app.get("/all-jobs", async (req, res) => {
      const jobs = await jobsCollections.find({}).toArray();
      res.send(jobs);
    });

    // fetch daata get jobs by email 
    app.get("/myJobs/:email",async(req,res)=>{
      // console.log(req.params.email)
      const jobs = await jobsCollections.find({postedBy : req.params.email }).toArray();
      res.send(jobs)
    })

    // delete a jobs
    app.delete("/job/:id",async(req,res) =>{
      const id = req.params.id;
      const filter = {
        _id: new ObjectId(id)
      };
      const result = await jobsCollections.deleteOne(filter);
      res.send(result)

    })

    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  }  catch (e) {
    console.error("Could not connect to MongoDB", e);
  }
  // Do not close the client here

}
run().catch(console.dir);

// server

app.get("/", (req, res) => {
  res.send("Hello developer!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
