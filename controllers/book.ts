import { pool } from "../shared/database";
import { Request, Response, Router } from "express";

export async function listBook(req: Request, res: Response) {

  const client = await pool.connect();
  try {
    const books = await client.query(`select * from books`)
    if (books.rowCount === 0) {
      return res.status(404).json({ message: "não encontrado" })
    }
    return res.status(200).json(books.rows);
  } catch (error) {
    console.log(error)
  } finally {
    client.release()
  }
}


export async function saveBook(req: Request, res: Response) {
  const client = await pool.connect();
  const book = req.body;
  console.log(book)
  try {
    const response = await client.query(`INSERT INTO books (title, description) VALUES ('${book.title}','${book.description}')`);
    console.log(response.rows[0]);
    res.status(201).json(response);
  } catch (error) {
    res.status(404).json({ message: 'Dados inválidos', error });
  } finally {
    client.release();
  }
}

export async function deleteBook(req: Request, res: Response) {
  const client = await pool.connect();
  const id = req.params.id;
  try {
    const response = await client.query(`DELETE FROM books WHERE id=${id}`);
    res.status(200).json({message: "Registro Excluído"});
  } catch (error) {
    res.status(404).json({ message: error });
  } finally {
    client.release();
  }
}