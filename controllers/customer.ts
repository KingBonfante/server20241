import { pool } from "../shared/database";
import { Request, Response, Router } from "express";

export async function listCustomer(req: Request, res: Response) {

  const client = await pool.connect();
  try {
    const customers = await client.query(`select * from customers`)
    if (customers.rowCount === 0) {
      return res.status(404).json({ message: "não encontrado" })
    }
    return res.status(200).json(customers.rows);
  } catch (error) {
    console.log(error)
  } finally {
    client.release()
  }
}


export async function saveCustomer(req: Request, res: Response) {
  const client = await pool.connect();
  const customer = req.body;
  console.log(customer)
  try {
    const response = await client.query(`INSERT INTO customers (name, email) VALUES ('${customer.name}','${customer.email}')`);
    console.log(response.rows[0]);
    res.status(201).json(response);
  } catch (error) {
    res.status(404).json({ message: 'Dados inválidos', error });
  } finally {
    client.release();
  }
}

export async function deleteCustomer(req: Request, res: Response) {
  const client = await pool.connect();
  const id = req.params.id;
  try {
    const response = await client.query(`DELETE FROM customers WHERE id=${id}`);
    res.status(200).json({message: "Registro Excluído"});
  } catch (error) {
    res.status(404).json({ message: error });
  } finally {
    client.release();
  }
}