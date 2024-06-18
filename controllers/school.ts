import { client, pool } from "../shared/database";
import { Request, Response, Router } from "express";

export async function listSchool(req: Request, res: Response) {
  const client = await pool.connect();
  const schools = await client.query(`select * from schools`)
  return res.status(200).json(schools.rows);
}

export async function saveSchool(req: Request, res: Response) {
  const client = await pool.connect();
  const school = req.body;
  console.log(school);
  try {
    const response = await client.query(`INSERT INTO schools (name) VALUES ('${school.name}')`);
    console.log(response.rows[0]);
    res.status(201).json(response.rows[0]);
  } catch (error) {
    res.status(400).json({ message: 'Dados inválidos', error });
  } finally {
    client.release()
  }
}

export async function deleteSchool(req: Request, res: Response) {
  const client = await pool.connect();
  const id = req.params.id;
  try {
    const response = await client.query(`DELETE FROM schools WHERE id=${id}`);
    res.status(200).json({message: "Registro Excluído"});
  } catch (error) {
    res.status(404).json({ message: error });
  } finally {
    client.release();
  }
}