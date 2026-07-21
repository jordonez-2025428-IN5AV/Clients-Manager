import { Router } from 'express';
import {
  crearCliente,
  listarClientes
} from '../controllers/cliente.controller.js';

export const clienteRouter = Router();

clienteRouter.post('/', crearCliente);
clienteRouter.get('/', listarClientes);
