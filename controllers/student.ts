import { pool } from "../shared/database";
import { Request, Response, Router } from "express";

export async function listStudent(req: Request, res: Response) {

  const client = await pool.connect();
  try {
    const students = await client.query(`select * from students`)
    if (students.rowCount === 0) {
      return res.status(404).json({ message: "não encontrado" })
    }
    return res.status(200).json(students.rows);
  } catch (error) {
    console.log(error)
  } finally {
    client.release()
  }
}


export async function saveStudent(req: Request, res: Response) {
  const client = await pool.connect();
  const student = req.body;
  console.log(student)
  try {
    const response = await client.query(`INSERT INTO students (name, email) VALUES ('${student.name}','${student.email}')`);
    console.log(response.rows[0]);
    res.status(201).json(response);
  } catch (error) {
    res.status(404).json({ message: 'Dados inválidos', error });
  } finally {
    client.release();
  }
}

export async function deleteStudent(req: Request, res: Response) {
  const client = await pool.connect();
  const id = req.params.id;
  try {
    const response = await client.query(`DELETE FROM students WHERE id=${id}`);
    res.status(200).json({message: "Registro Excluído"});
  } catch (error) {
    res.status(404).json({ message: error });
  } finally {
    client.release();
  }
}