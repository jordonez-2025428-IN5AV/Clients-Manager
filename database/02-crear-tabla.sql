-- Ejecuta este archivo después de conectarte a clientes_db.

CREATE TABLE IF NOT EXISTS clientes (
  "codigoCliente" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "nombreCliente" VARCHAR(120) NOT NULL,
  "direccionCliente" VARCHAR(250) NOT NULL,
  telefono VARCHAR(30) NOT NULL
);
