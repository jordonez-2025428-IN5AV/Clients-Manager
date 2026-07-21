import type { NextFunction, Request, Response } from 'express';
import { ClienteService } from '../services/cliente.service.js';
import type { CrearClienteDTO } from '../types/cliente.js';

const clienteService = new ClienteService();

export async function crearCliente(
  request: Request<unknown, unknown, CrearClienteDTO>,
  response: Response,
  next: NextFunction
): Promise<void> {
  try {
    const cliente = await clienteService.crear(request.body);

    response.status(201).json({
      mensaje: 'Cliente registrado correctamente.',
      cliente
    });
  } catch (error) {
    next(error);
  }
}

export async function listarClientes(
  _request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  try {
    const clientes = await clienteService.listar();
    response.status(200).json(clientes);
  } catch (error) {
    next(error);
  }
}
