import { Component, ViewChild } from '@angular/core';
import { ClienteFormComponent } from './components/cliente-form/cliente-form.component';
import { ClienteListComponent } from './components/cliente-list/cliente-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ClienteFormComponent, ClienteListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  @ViewChild(ClienteListComponent)
  private clienteListComponent?: ClienteListComponent;

  actualizarLista(): void {
    this.clienteListComponent?.cargarClientes();
  }
}
