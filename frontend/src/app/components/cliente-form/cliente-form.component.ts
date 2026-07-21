import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { finalize } from 'rxjs';
import { ClienteService } from '../../services/cliente.service';

@Component({
  selector: 'app-cliente-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cliente-form.component.html',
  styleUrl: './cliente-form.component.css'
})
export class ClienteFormComponent {
  @Output() readonly clienteCreado = new EventEmitter<void>();

  private readonly formBuilder = inject(FormBuilder);
  private readonly clienteService = inject(ClienteService);

  readonly formulario = this.formBuilder.nonNullable.group({
    nombreCliente: ['', [Validators.required, Validators.maxLength(120)]],
    direccionCliente: ['', [Validators.required, Validators.maxLength(250)]],
    telefono: ['', [Validators.required, Validators.maxLength(30)]]
  });

  enviando = false;
  mensajeExito = '';
  mensajeError = '';

  guardar(): void {
    this.mensajeExito = '';
    this.mensajeError = '';

    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      this.mensajeError = 'Completa correctamente todos los campos.';
      return;
    }

    this.enviando = true;

    this.clienteService
      .crear(this.formulario.getRawValue())
      .pipe(finalize(() => (this.enviando = false)))
      .subscribe({
        next: (respuesta) => {
          this.mensajeExito = respuesta.mensaje;
          this.formulario.reset();
          this.clienteCreado.emit();
        },
        error: (error: { error?: { error?: string } }) => {
          this.mensajeError =
            error.error?.error ?? 'No fue posible registrar el cliente.';
        }
      });
  }

  campoInvalido(campo: 'nombreCliente' | 'direccionCliente' | 'telefono'): boolean {
    const control = this.formulario.controls[campo];
    return control.invalid && (control.dirty || control.touched);
  }
}
