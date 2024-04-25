import db from '../database/db.js';

class Item {
  constructor(type, description) {
    this.type = type;
    this.description = description;
  }

  async save() {
    const client = await db.connect();

    const result = await client.query(
      'INSERT INTO public."Item"(type, description) VALUES ($1, $2) RETURNING *',
      [this.type, this.description],
    );

    client.release();
    return result.rows[0];
  }

  static async findAll() {
    const client = await db.connect();

    const result = await client.query('SELECT * FROM public."Item"');

    client.release();
    return result.rows;
  }

  static async findById(id) {
    const client = await db.connect();

    const result = await client.query(
      'SELECT * FROM public."Item" WHERE id=$1',
      [id],
    );

    client.release();
    return result.rows;
  }

  static async destroy(id) {
    const client = await db.connect();

    const result = await client.query(
      'DELETE FROM public."Item" WHERE id=$1 RETURNING *',
      [id],
    );

    client.release();
    return result.rows;
  }
}

export default Item;
