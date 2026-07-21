import { ClienteRepository } from '../models/cliente.repository.js';
import type { Cliente, CrearClienteDTO } from '../types/cliente.js';

export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

export class ClienteService {
  constructor(private readonly repository = new ClienteRepository()) {}

  async crear(datos: CrearClienteDTO): Promise<Cliente> {
    const clienteLimpio: CrearClienteDTO = {
      nombreCliente: datos.nombreCliente?.trim(),
      direccionCliente: datos.direccionCliente?.trim(),
      telefono: datos.telefono?.trim()
    };

    if (
      !clienteLimpio.nombreCliente ||
      !clienteLimpio.direccionCliente ||
      !clienteLimpio.telefono
    ) {
      throw new ValidationError(
        'nombreCliente, direccionCliente y telefono son obligatorios.'
      );
    }

    if (clienteLimpio.nombreCliente.length > 120) {
      throw new ValidationError('nombreCliente no puede superar 120 caracteres.');
    }

    if (clienteLimpio.direccionCliente.length > 250) {
      throw new ValidationError('direccionCliente no puede superar 250 caracteres.');
    }

    if (clienteLimpio.telefono.length > 30) {
      throw new ValidationError('telefono no puede superar 30 caracteres.');
    }

    return this.repository.crear(clienteLimpio);
  }

  async listar(): Promise<Cliente[]> {
    return this.repository.listar();
  }
}
