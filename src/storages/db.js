import { MongoClient } from 'mongodb';

const { MONGO_URI, MONGO_DB } = process.env;

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
