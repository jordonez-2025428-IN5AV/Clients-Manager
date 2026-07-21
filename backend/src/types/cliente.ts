export interface Cliente {
  codigoCliente: number;
  nombreCliente: string;
  direccionCliente: string;
  telefono: string;
}

export interface CrearClienteDTO {
  nombreCliente: string;
  direccionCliente: string;
  telefono: string;
}
