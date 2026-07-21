import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import {
  Cliente,
  CrearCliente,
  CrearClienteResponse
} from '../models/cliente.model';

@Injectable({ providedIn: 'root' })
export class ClienteService {
  private readonly http = inject(HttpClient);
  private readonly endpoint = `${environment.apiUrl}/clientes`;

  listar(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.endpoint);
  }

  crear(cliente: CrearCliente): Observable<CrearClienteResponse> {
    return this.http.post<CrearClienteResponse>(this.endpoint, cliente);
  }
}
