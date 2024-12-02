const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
//gym-10
// LQlMV7wXXrpXZSRk

const uri =
  'mongodb+srv://gym-10:LQlMV7wXXrpXZSRk@cluster0.whh17.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

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
    await client.connect();
    // Send a ping to confirm a successful connection
    const userSchedule = client.db('userSchedule').collection('users');
    app.post('/addSchedule', async (req, res) => {
      const addSchedule = req.body;
      console.log(addSchedule);
      const result = await userSchedule.insertOne(addSchedule);
      res.send(result);
    });

    app.get('/addSchedule', async (req, res) => {
      const cursor = userSchedule.find();
      const result = await cursor.toArray();
      res.send(result);
    });
    //delete
    app.delete('/addSchedule/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await userSchedule.deleteOne(query);
      res.send(result);
    });
    //update user
    app.patch('/addSchedule/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const update = {
        $set: {
          title: data?.title,
          day: data?.day,
          date: data?.date,
        },
      };
      const result = await userSchedule.updateOne(query, update);
      res.send(result);
    });
    await client.db('admin').command({ ping: 1 });
    console.log(
      'Pinged your deployment. You successfully connected to MongoDB!'
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Coffee website is runingss');
});

app.listen(port, () => {
  console.log('coffee server is runing');
});
