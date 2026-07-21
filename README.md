# Clientes Manager

Aplicación Full Stack para registrar y listar clientes.

## Tecnologías

- Angular + TypeScript
- Node.js + Express + TypeScript
- PostgreSQL

## Estructura

- `frontend/`: aplicación Angular.
- `backend/`: API REST con Express.
- `database/`: scripts SQL.

## 1. Crear la base de datos

Con pgAdmin:

1. Conéctate al servidor PostgreSQL.
2. Abre Query Tool sobre la base `postgres`.
3. Ejecuta `database/01-crear-base-datos.sql`.
4. Conéctate a `clientes_db`.
5. Ejecuta `database/02-crear-tabla.sql`.

Con `psql`:

```bash
psql -U postgres -f database/01-crear-base-datos.sql
psql -U postgres -d clientes_db -f database/02-crear-tabla.sql
```

## 2. Backend

```bash
cd backend
npm install
npm run dev
```

La API queda en `http://localhost:3000`.

El archivo `.env` local incluido usa la contraseña solicitada para desarrollo. No debes subirlo a Git. Para crear uno nuevo:

```bash
copy .env.example .env
```

Después edita `DB_PASSWORD`.

## 3. Frontend

En otra terminal:

```bash
cd frontend
npm install
npm start
```

Abre `http://localhost:4200`.

## 4. Probar la API

Listar clientes:

```bash
curl http://localhost:3000/api/clientes
```

Registrar cliente en Windows CMD:

```bat
curl -X POST http://localhost:3000/api/clientes ^
  -H "Content-Type: application/json" ^
  -d "{\"nombreCliente\":\"Ana López\",\"direccionCliente\":\"Zona 1\",\"telefono\":\"5555-5555\"}"
```

Registrar cliente en PowerShell:

```powershell
Invoke-RestMethod -Method Post `
  -Uri "http://localhost:3000/api/clientes" `
  -ContentType "application/json" `
  -Body '{"nombreCliente":"Ana López","direccionCliente":"Zona 1","telefono":"5555-5555"}'
```

## 5. Verificar los datos

En pgAdmin o `psql` ejecuta:

```sql
SELECT
  "codigoCliente",
  "nombreCliente",
  "direccionCliente",
  telefono
FROM clientes
ORDER BY "codigoCliente";
```
