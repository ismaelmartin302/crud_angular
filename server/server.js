// Alternativa 1 MongoDB

const express = require('express');
const { MongoClient, ObjectId, ServerApiVersion } = require('mongodb');
const cors = require('cors');

const app = express();
const port = 3000;

// Cors configuration - Allows requests from localhost:4200
const corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 204,
    methods: 'GET, POST, PUT, DELETE'
};

// Use cors middleware
app.use(cors(corsOptions));

// Use express.json() middleware to parse JSON bodies of requests
app.use(express.json());

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const uri = 'mongodb+srv://appUser:12345@cluster0.lbrxgtv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const dbName = 'twitterCrud';

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
    }
});

// Function to connect to MongoDB Atlas
async function connectToMongoDB() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
        return client.db(dbName);
    } catch (err) {
        console.error('Error connecting to MongoDB', err);
        throw err;
    }
}

// GET route - Allows to get all the items
app.get('/crud', async(req, res) => {
    const page = parseInt(req.query.page) || 0;
    const perPage = parseInt(req.query.perPage) || 10;

    try {
        const db = await connectToMongoDB();
        const collection = db.collection('tweets');

        const totalTweets = await collection.countDocuments();
        const items = await collection.find().skip(page * perPage).limit(perPage).toArray();

        res.status(200).json({
            items,
            total: totalTweets,
            page,
            perPage,
            totalPages: Math.ceil(totalTweets / perPage)
        });
    } catch (err) {
        console.error('Error fetching items', err);
        res.status(500).send('Internal Server Error');
    }
});

// POST route - Allows to add a new item
app.post('/crud', async(req, res) => {
    const { usuario, contenido } = req.body;

    try {
        const db = await connectToMongoDB();
        const collection = db.collection('tweets');

        const result = await collection.insertOne({ usuario, contenido });
        const newItem = result.ops[0];

        res.status(201).json(newItem);
    } catch (err) {
        console.error('Error adding item', err);
        res.status(500).send('Internal Server Error');
    }
});

// PUT route - Allows to update an item
app.put('/crud/:id', async(req, res) => {
    const id = req.params.id;
    const { usuario, contenido } = req.body;

    try {
        const db = await connectToMongoDB();
        const collection = db.collection('tweets');

        const result = await collection.findOneAndUpdate(
            { _id: ObjectId(id) },
            { $set: { usuario, contenido } },
            { returnOriginal: false }
        );

        const updatedItem = result.value;

        if (!updatedItem) {
            res.status(404).send('Not Found');
            return;
        }

        res.status(200).json(updatedItem);
    } catch (err) {
        console.error('Error updating item', err);
        res.status(500).send('Internal Server Error');
    }
});

// DELETE route - Allows to delete an item
app.delete('/crud/:id', async(req, res) => {
    const id = req.params.id;

    try {
        const db = await connectToMongoDB();
        const collection = db.collection('tweets');

        const result = await collection.deleteOne({ _id: ObjectId(id) });

        if (result.deletedCount === 0) {
            res.status(404).send('Not Found');
            return;
        }

        res.status(204).send();
    } catch (err) {
        console.error('Error deleting item', err);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
