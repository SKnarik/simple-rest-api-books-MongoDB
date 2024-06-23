import moment from "moment";
import { bookValidationSchema } from "../validations/book-validation.js";
import { connection } from "../storages/db.js";

export const createBook = (req, res) => {

};

export const getBooks = async (req, res) => {

    try {
        const db = await connection();
        const booksCollection = db.collection('books');
        const books = await booksCollection.find().toArray(); 
        res.status(200).json(books); 
    } catch (error) {
        console.error('Error fetching books:', error.message);
        res.status(500).json({ message: 'Failed to fetch books.' });
    }


};

export const getBook = (req, res) => {

};

export const updateBook = (req, res) => {

};

export const deleteBook = (req, res) => {

};
