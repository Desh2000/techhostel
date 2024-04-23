const dotenv = require('dotenv');
const { MongoClient, ServerApiVersion } = require('mongodb');

dotenv.config();

const connectionString = process.env.MONGO_URI;

const client = new MongoClient(connectionString);

async function getDB() {
    let db;
    const conn = await client.connect();
    db = conn.db("tech_hostel");
    return db;
}

module.exports = getDB;