import type { Request, Response } from 'express';

export function notFoundMiddleware(request: Request, response: Response): void {
  response.status(404).json({
    error: 'Ruta no encontrada.',
    ruta: request.originalUrl
  });
}
