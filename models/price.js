import db from '../database/db.js';

class Price {
  constructor(
    organization_id,
    item_id,
    zone,
    base_distance_in_km,
    km_price,
    fix_price,
  ) {
    this.organization_id = organization_id;
    this.item_id = item_id;
    this.zone = zone;
    this.base_distance_in_km = base_distance_in_km;
    this.km_price = km_price;
    this.fix_price = fix_price;
  }

  async save() {
    const client = await db.connect();

    const query = 'INSERT INTO public."Price"(organization_id, item_id, zone, base_distance_in_km, km_price, fix_price) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';

    const values = [
      this.organization_id,
      this.item_id,
      this.zone,
      this.base_distance_in_km,
      this.km_price,
      this.fix_price,
    ];

    const result = await client.query(query, values);

    client.release();
    return result.rows;
  }

  static async findAll() {
    const client = await db.connect();

    const result = await client.query('SELECT * FROM public."Price"');

    client.release();
    return result.rows;
  }

  static async findById(id) {
    const client = await db.connect();

    const result = await client.query(
      'SELECT * FROM public."Price" WHERE id=$1',
      [id],
    );

    client.release();
    return result.rows;
  }

  static async findPriceByOrgAndZone(org_id, zone) {
    const client = await db.connect();

    const result = await client.query(
      'SELECT * FROM public."Price" WHERE organization_id=$1 AND zone=$2',
      [org_id, zone],
    );

    client.release();
    return result.rows;
  }

  static async destroy(id) {
    const client = await db.connect();

    const result = await client.query(
      'DELETE FROM public."Price" WHERE id=$1 RETURNING *',
      [id],
    );

    client.release();
    return result.rows;
  }
}

export default Price;
