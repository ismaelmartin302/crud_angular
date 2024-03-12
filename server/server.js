// Importación de paquetes necesarios
const express = require('express'); // Express para el servidor web
const { MongoClient, ObjectId, ServerApiVersion } = require('mongodb'); // Cliente MongoDB y tipos relacionados
const cors = require('cors'); // Middleware para manejar CORS (Cross-Origin Resource Sharing)

// Configuración básica del servidor Express
const app = express(); // Creación de la aplicación Express
const port = 3000; // Puerto en el que se ejecutará el servidor

// Configuración de CORS para permitir solicitudes desde localhost:4200
const corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 204,
    methods: 'GET, POST, PUT, DELETE'
};
app.use(cors(corsOptions)); // Usar middleware de CORS

// Middleware para parsear cuerpos de solicitud en formato JSON
app.use(express.json());

// Configuración de la conexión a MongoDB Atlas
const uri = 'mongodb+srv://appUser:12345@cluster0.lbrxgtv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const dbName = 'twitterCrud'; // Nombre de la base de datos
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1, // Versión de la API de MongoDB
        strict: true,
        deprecationErrors: true
    }
});

// Función para conectar a la base de datos MongoDB Atlas
async function connectToMongoDB() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
        return client.db(dbName); // Devuelve la base de datos conectada
    } catch (err) {
        console.error('Error connecting to MongoDB', err);
        throw err;
    }
}

// Ruta GET - Permite obtener todos los elementos
app.get('/crud', async(req, res) => {
    try {
        const db = await connectToMongoDB();
        const collection = db.collection('tweets'); // Obtener la colección 'tweets'

        const items = await collection.find().toArray(); // Buscar todos los elementos y convertirlos en un array

        res.status(200).json({
            items
        }); // Enviar los elementos como respuesta
    } catch (err) {
        console.error('Error fetching items', err);
        res.status(500).send('Internal Server Error');
    }
});

// Ruta POST - Permite agregar un nuevo elemento
app.post('/crud', async(req, res) => {
    const { usuario, contenido } = req.body; // Obtener datos del cuerpo de la solicitud

    try {
        const db = await connectToMongoDB();
        const collection = db.collection('tweets'); // Obtener la colección 'tweets'

        const result = await collection.insertOne({ usuario, contenido }); // Insertar un nuevo elemento

        res.status(201).json(result); // Enviar resultado de la inserción como respuesta
    } catch (err) {
        console.error('Error adding item', err);
        res.status(500).send('Internal Server Error');
    }
});

// Ruta PUT - Permite actualizar un elemento
app.put('/crud/:id', async(req, res) => {
    const id = req.params.id;
    const { usuario, contenido } = req.body; // Obtener datos del cuerpo de la solicitud

    try {
        const db = await connectToMongoDB();
        const collection = db.collection('tweets'); // Obtener la colección 'tweets'

        const result = await collection.findOneAndUpdate(
            { _id: new ObjectId(id) }, // Encontrar el elemento por su ID
            { $set: { usuario, contenido } }, // Actualizar los campos especificados
            { returnOriginal: false }
        );

        const updatedItem = result.value;

        if (!updatedItem) {
            res.status(404).send('Not Found');
            return;
        }

        res.status(200).json(updatedItem); // Enviar el elemento actualizado como respuesta
    } catch (err) {
        console.error('Error updating item', err);
        res.status(500).send('Internal Server Error');
    }
});

// Ruta DELETE - Permite eliminar un elemento
app.delete('/crud/:id', async(req, res) => {
    const id = req.params.id; // Obtener el ID del parámetro de la URL

    try {
        const db = await connectToMongoDB();
        const collection = db.collection('tweets'); // Obtener la colección 'tweets'

        const result = await collection.deleteOne({ _id: new ObjectId(id) }); // Eliminar el elemento por su ID

        if (result.deletedCount === 0) {
            res.status(404).send('Not Found');
            return;
        }

        res.status(204).send(); // Enviar respuesta de éxito sin contenido
    } catch (err) {
        console.error('Error deleting item', err);
        res.status(500).send('Internal Server Error');
    }
});

// Iniciar el servidor en el puerto especificado
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
