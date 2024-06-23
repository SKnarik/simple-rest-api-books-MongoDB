import { MongoClient } from 'mongodb';

const MONGO_URI = 'mongodb+srv://knariksoghoyanfd:PuvsirctSI3k5dOA@cluster13.joekyik.mongodb.net/';
const MONGO_DB = 'BooksFreeDOM';

let mongoClient;
let dbConnection;

export async function connection() {
    try {
        if (!mongoClient) {
            mongoClient = new MongoClient(MONGO_URI);
            await mongoClient.connect();
            dbConnection = mongoClient.db(MONGO_DB);
            console.log("Successfully connected to MongoDB");
        }
        return dbConnection;
    } catch (err) {
        console.error('Connection error:', err.message);
        throw new Error('Failed to establish database connection.');
    }
};
