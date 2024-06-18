import { pool } from "../shared/database";
import { Request, Response, Router } from "express";

export async function listRestaurant(req: Request, res: Response) {

  const client = await pool.connect();
  try {
    const restaurants = await client.query(`select * from restaurants`)
    if (restaurants.rowCount === 0) {
      return res.status(404).json({ message: "não encontrado" })
    }
    return res.status(200).json(restaurants.rows);
  } catch (error) {
    console.log(error)
  } finally {
    client.release()
  }
}


export async function saveRestaurant(req: Request, res: Response) {
  const client = await pool.connect();
  const restaurant = req.body;
  console.log(restaurant)
  try {
    const response = await client.query(`INSERT INTO restaurants (name, address) VALUES ('${restaurant.name}','${restaurant.address}')`);
    console.log(response.rows[0]);
    res.status(201).json(response);
  } catch (error) {
    res.status(404).json({ message: 'Dados inválidos', error });
  } finally {
    client.release();
  }
}

export async function deleteRestaurant(req: Request, res: Response) {
  const client = await pool.connect();
  const id = req.params.id;
  try {
    const response = await client.query(`DELETE FROM restaurants WHERE id=${id}`);
    res.status(200).json({message: "Registro Excluído"});
  } catch (error) {
    res.status(404).json({ message: error });
  } finally {
    client.release();
  }
}