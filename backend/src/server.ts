import { app } from './app.js';
import { verificarConexion } from './config/database.js';
import { env } from './config/env.js';

async function iniciarServidor(): Promise<void> {
  try {
    await verificarConexion();

    app.listen(env.port, () => {
      console.log(`Servidor disponible en http://localhost:${env.port}`);
    });
  } catch (error) {
    console.error('No fue posible iniciar el servidor:', error);
    process.exit(1);
  }
}

void iniciarServidor();
