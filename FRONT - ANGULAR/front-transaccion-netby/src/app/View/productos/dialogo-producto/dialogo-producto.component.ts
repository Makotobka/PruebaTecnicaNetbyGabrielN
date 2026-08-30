import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Producto } from '../../../Shared/Interaces/DtoProductos';

export interface DatosDialogoProducto {
  producto?: Producto;
}

@Component({
  selector: 'app-dialogo-producto',
  templateUrl: './dialogo-producto.component.html',
  styleUrls: ['./dialogo-producto.component.scss'],
})
export class DialogoProductoComponent {
  readonly formulario: FormGroup;
  readonly esEdicion: boolean;

  constructor(
    private readonly constructorFormulario: FormBuilder,
    private readonly referenciaDialogo: MatDialogRef<DialogoProductoComponent>,
    @Inject(MAT_DIALOG_DATA) private readonly datos: DatosDialogoProducto,
  ) {
    this.esEdicion = !!datos.producto?.id;
    this.formulario = this.constructorFormulario.group({
      nombre: [
        datos.producto?.nombre || '',
        [Validators.required, Validators.maxLength(150)],
      ],
      categoria: [
        datos.producto?.categoria || '',
        [Validators.required, Validators.maxLength(100)],
      ],
      descripcion: [
        datos.producto?.descripcion || '',
        [Validators.maxLength(1000)],
      ],
      precioUnitario: [
        datos.producto?.precioUnitario ?? null,
        [Validators.required, Validators.min(0)],
      ],
      stock: [
        datos.producto?.stock ?? 0,
        [
          Validators.required,
          Validators.min(1),
          Validators.pattern('^[0-9]+$'),
        ],
      ],
      urlImagen: [
        datos.producto?.urlImagen || '',
        [Validators.maxLength(2048)],
      ],
      estado: [datos.producto?.estado !== false, Validators.required],
    });
  }

  guardar(): void {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      alert(
        'Por favor, complete todos los campos requeridos y corrija los errores antes de guardar.',
      );
      return;
    }

    const producto: Producto = {
      ...this.formulario.getRawValue(),
      id: this.datos.producto?.id,
      precioUnitario: Number(this.formulario.value.precioUnitario),
      stock: Number(this.formulario.value.stock),
    };
    this.referenciaDialogo.close(producto);
  }

  cancelar(): void {
    this.referenciaDialogo.close();
  }
}
