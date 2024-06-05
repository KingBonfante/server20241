import { pool } from "../shared/database";
import { Request, Response, Router } from "express";

export async function listStudent(req: Request, res: Response) {
  //conecta com o banco
  const client = await pool.connect();
  //realiza consulta sql
  const students = await client.query(`select * from students`)
  //retorna consulta em formato json
  return res.status(200).json(students.rows);
}
export async function saveStudent(req: Request, res: Response) {
  const student = req.body;
  console.log(student)
  //conecta com o banco
  const client = await pool.connect();
  //realiza consulta sql
  const response = await client.query(`INSERT INTO students (name, email) VALUES ('${student.name}','${student.email}')`)
  res.status(201).json(response);
}