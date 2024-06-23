import moment from "moment";
import { bookValidationSchema } from "../validations/book-validation.js";
import { connection } from "../storages/db.js";

const db = await connection();
const booksCollection = db.collection('books');


export const createBook = async (req, res) => {

      try {
        const { title, author, genre, year_published, rating, summary } = req.body;
        const createdAt = moment().format('MMMM Do YYYY, h:mm:ss a');
    
        const { error } = bookValidationSchema.validate(req.body);
    
        if (error) {
          res.status(403).send(error.message);
          return
        }
    
        const newBook = {
          title,
          author,
          genre,
          year_published,
          rating,
          summary,
          createdAt: createdAt,
        };         
    
        const isExisting = await booksCollection.findOne({ title });
        if (isExisting) {
          res.status(400).send("Book already exists.");
          return;
        }

        const books = await booksCollection.insertOne(newBook); 
    
        res.status(200).send({ book: newBook });
      } catch (error) {
        res.status(400).send({ error: error.message });
      }
};

export const getBooks = async (req, res) => {

    try {
        const books = await booksCollection.find().toArray(); 
        res.status(200).send({ books });
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
};

export const getBook = (req, res) => {

};

export const updateBook = (req, res) => {

};

export const deleteBook = (req, res) => {

};
