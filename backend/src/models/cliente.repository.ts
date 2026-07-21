import { pool } from '../config/database.js';
import type { Cliente, CrearClienteDTO } from '../types/cliente.js';

interface ClienteRow {
  codigoCliente: number;
  nombreCliente: string;
  direccionCliente: string;
  telefono: string;
}

export class ClienteRepository {
  async crear(datos: CrearClienteDTO): Promise<Cliente> {
    const query = `
      INSERT INTO clientes ("nombreCliente", "direccionCliente", telefono)
      VALUES ($1, $2, $3)
      RETURNING
        "codigoCliente",
        "nombreCliente",
        "direccionCliente",
        telefono;
    `;

    const values = [
      datos.nombreCliente,
      datos.direccionCliente,
      datos.telefono
    ];

    const result = await pool.query<ClienteRow>(query, values);
    const cliente = result.rows[0];

    if (!cliente) {
      throw new Error('PostgreSQL no devolvió el cliente registrado.');
    }

    return cliente;
  }

  async listar(): Promise<Cliente[]> {
    const query = `
      SELECT
        "codigoCliente",
        "nombreCliente",
        "direccionCliente",
        telefono
      FROM clientes
      ORDER BY "codigoCliente" ASC;
    `;

    const result = await pool.query<ClienteRow>(query);
    return result.rows;
  }
}
