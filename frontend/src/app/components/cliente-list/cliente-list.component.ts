import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { finalize } from 'rxjs';
import { Cliente } from '../../models/cliente.model';
import { ClienteService } from '../../services/cliente.service';

@Component({
  selector: 'app-cliente-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cliente-list.component.html',
  styleUrl: './cliente-list.component.css'
})
export class ClienteListComponent implements OnInit {
  private readonly clienteService = inject(ClienteService);

  clientes: Cliente[] = [];
  cargando = false;
  mensajeError = '';

  ngOnInit(): void {
    this.cargarClientes();
  }

  cargarClientes(): void {
    this.cargando = true;
    this.mensajeError = '';

    this.clienteService
      .listar()
      .pipe(finalize(() => (this.cargando = false)))
      .subscribe({
        next: (clientes) => {
          this.clientes = clientes;
        },
        error: () => {
          this.mensajeError = 'No fue posible cargar la lista de clientes.';
        }
      });
  }
}
