import moment from "moment";
import { bookValidationSchema } from "../validations/book-validation.js";
import { connection } from "../storages/db.js";
import { ObjectId } from "mongodb";

const db = await connection();
const booksCollection = db.collection("books");

export const createBook = async (req, res) => {
  try {
    const { title, author, genre, year_published, rating, summary } = req.body;
    const createdAt = moment().format("MMMM Do YYYY, h:mm:ss a");

    const { error } = bookValidationSchema.validate(req.body);

    if (error) {
      return res.status(403).send(error.message); 
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
      return res.status(400).send("Book already exists.");
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

export const getBook = async (req, res) => {
  try {
    const { id } = req.params;
    const thisBook = await booksCollection.findOne({ _id: new ObjectId(id) });

    if (!thisBook) {
      throw new Error("Book not found");
    }

    res.status(200).send({ book: thisBook });
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
};

export const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const payload = req.body;

    if (!id) {
      throw new Error("ID parameter is required");
    }

    const updatedBook = await booksCollection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: payload },
      { returnOriginal: false }
    );
    if (!updatedBook) {
      throw new Error("Book not found or not updated.");
    }
    res.status(200).send({ book: updatedBook });
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
};

export const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      throw new Error("ID parameter is required");
    }

    const deletedBook = await booksCollection.deleteOne({ _id: new ObjectId(id) });
    if (!deletedBook) {
      throw new Error("Book not found or not deleted.");
    }
    res.status(200).send({ book: deletedBook });
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
};
