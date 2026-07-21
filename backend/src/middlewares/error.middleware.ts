import type { NextFunction, Request, Response } from 'express';
import { ValidationError } from '../services/cliente.service.js';

export function errorMiddleware(
  error: unknown,
  _request: Request,
  response: Response,
  _next: NextFunction
): void {
  if (error instanceof ValidationError) {
    response.status(400).json({ error: error.message });
    return;
  }

  console.error(error);

  response.status(500).json({
    error: 'Ocurrió un error interno en el servidor.'
  });
}
