const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;
require("dotenv").config();

// Express middleware
app.use(express.json());
app.use(cors());




// const openai = new OpenAI({
//   apiKey: process.env.OPEN_AI_KEY,
// });
// app.post('/chat', async (req, res) => {
//   const { prompt } = req.body;

//   try {
//     const response = await openai.createChatCompletion({
//       model: "gpt-3.5-turbo", // Make sure this model is available for your use
//       messages: [
//         {
//           role: "system",
//           content: "You are a helpful assistant."
//         },
//         {
//           role: "user",
//           content: prompt,
//         },
//       ],
//       max_tokens:50
//     });

//     // Assuming the response format has the messages array
//     if (response.data && response.data.choices && response.data.choices.length > 0) {
//       const messages = response.data.choices[0].message.content;
//       res.json({ messages });
//     } else {
//       res.status(500).send('Failed to receive a valid response from OpenAI.');
//     }
//   } catch (error) {
//     console.error('Error calling OpenAI:', error);
//     res.status(500).send('An error occurred while processing your request.');
//   }
// });

// I have this in my MERN stack code file, and it works well.


// Explain

// mongodb

const { MongoClient, ServerApiVersion,ObjectId } = require("mongodb");
// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@job-portal-demo.jouxbiv.mongodb.net/?retryWrites=true&w=majority`;
// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}cluster0.l5zplg1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.l5zplg1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

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

    // get single job using id 
    
    app.get("/all-jobs/:id", async (req, res) => {

    const id = req.params.id;
    const job = await jobsCollections.findOne({
      _id:new ObjectId(id)

    })
    res.send(job)
  })

  

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

    // update josb 

    app.patch("/update-job/:id",async(req,res) =>{
      const id = req.params.id;
      const jobData = req.body
      // refer always docus monggodb usage example

      const filter = {_id : new ObjectId(id)}
      const options = { upsert : true}
      const updateDoc = {
        // from docs example
        $set: {
          ...jobData

        },
      };

      const result = await jobsCollections.updateOne(filter,updateDoc,options)
      res.send(result);
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
