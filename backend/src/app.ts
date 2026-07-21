import cors from 'cors';
import express from 'express';
import { env } from './config/env.js';
import { errorMiddleware } from './middlewares/error.middleware.js';
import { notFoundMiddleware } from './middlewares/not-found.middleware.js';
import { clienteRouter } from './routes/cliente.routes.js';

export const app = express();

app.disable('x-powered-by');
app.use(
  cors({
    origin: env.frontendUrl,
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type']
  })
);
app.use(express.json({ limit: '100kb' }));

app.get('/api/health', (_request, response) => {
  response.status(200).json({ estado: 'ok' });
});

app.use('/api/clientes', clienteRouter);
app.use(notFoundMiddleware);
app.use(errorMiddleware);
