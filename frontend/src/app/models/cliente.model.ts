export interface Cliente {
  codigoCliente: number;
  nombreCliente: string;
  direccionCliente: string;
  telefono: string;
}

export interface CrearCliente {
  nombreCliente: string;
  direccionCliente: string;
  telefono: string;
}

export interface CrearClienteResponse {
  mensaje: string;
  cliente: Cliente;
}
