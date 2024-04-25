import db from '../database/db.js';

class Organisation {
  constructor(name) {
    this.name = name;
  }

  async save() {
    const client = await db.connect();

    const result = await client.query(
      'INSERT INTO public."Organisation"(name) VALUES ($1) RETURNING *',
      [this.name],
    );

    client.release();
    return result.rows[0];
  }

  static async findAll() {
    const client = await db.connect();

    const result = await client.query('SELECT * FROM public."Organisation"');

    client.release();
    return result.rows;
  }

  static async findById(id) {
    const client = await db.connect();

    const result = await client.query(
      'SELECT id, name FROM public."Organisation" WHERE id=$1',
      [id],
    );

    client.release();
    return result.rows;
  }

  static async findByName(name) {
    const client = await db.connect();

    const result = await client.query(
      'SELECT id, name FROM public."Organisation" WHERE name=$1',
      [name],
    );

    client.release();
    return result.rows;
  }

  static async destroy(id) {
    const client = await db.connect();

    const result = await client.query(
      'DELETE FROM public."Organisation" WHERE id=$1 RETURNING *',
      [id],
    );

    client.release();
    return result.rows;
  }
}

export default Organisation;
