import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConexionProductosService } from 'src/app/Service/conexion-productos.service';
import { Producto } from 'src/app/Shared/Interaces/DtoProductos';
import { Transaccion } from 'src/app/Shared/Interaces/DtoTransacciones';

export interface DatosDialogoTransacciones {
  transaccion?: Transaccion;
}

@Component({
  selector: 'app-dialogo-transacciones',
  templateUrl: './dialogo-transacciones.component.html',
  styleUrls: ['./dialogo-transacciones.component.scss'],
})
export class DialogoTransaccionesComponent {
  readonly formulario: FormGroup;
  readonly esEdicion: boolean;

  isVistaProductoVisible = false;
  listaProductos: Producto[] = [];

  constructor(
    private readonly constructorFormulario: FormBuilder,
    private readonly referenciaDialogo: MatDialogRef<DialogoTransaccionesComponent>,
    private readonly conexionProductos: ConexionProductosService,
    @Inject(MAT_DIALOG_DATA) private readonly datos: DatosDialogoTransacciones,
  ) {
    this.esEdicion = !!datos.transaccion?.id;

    this.formulario = this.constructorFormulario.group({
      id: [],
      idProducto: [],
      nombreBusquedaProducto: [''],
      nombreProducto: [
        {
          value: undefined,
          disabled: true,
        },
      ],
      categoriaProducto: [
        {
          value: undefined,
          disabled: true,
        },
      ],
      stockProducto: [
        {
          value: 0,
          disabled: true,
        },
        Validators.required,
        Validators.min(0),
      ],
      TipoTransaccion: [null, Validators.required],
      cantidad: [Validators.required, Validators.pattern('^[0-9]+$')],
      precioUnitario: [
        {
          value: 0,
          disabled: true,
        },
        Validators.required,
        Validators.min(0),
      ],
      precioTotal: [
        {
          value: 0,
          disabled: true,
        },
        Validators.required,
        Validators.min(0),
      ],
      detalle: [],
      estado: [datos.transaccion?.estado !== false, Validators.required],
    });

    this.registrarEventos();
  }

  registrarEventos() {
    if (this.datos.transaccion?.id) {
      //Falta la consulta de datos.
      const producto: Producto = {};
      this.formulario.patchValue({
        id: this.datos.transaccion?.id,
        idProducto: this.datos.transaccion.idProducto,
        nombreProducto: producto.nombre,
        categoriaProducto: producto.categoria,
        stockProducto: producto.stock,
        TipoTransaccion: this.datos.transaccion.tipo,
        cantidad: this.datos.transaccion.cantidad,
        precioUnitario: this.datos.transaccion.precioUnitario,
        precioTotal: this.datos.transaccion.precioTotal,
        detalle: this.datos.transaccion.detalle,
        estado: this.datos.transaccion.estado,
      });
    }

    this.formulario.controls['cantidad'].valueChanges.subscribe((value) => {
      if (value) {
        this.formulario.controls['precioTotal'].setValue(
          value * this.formulario.controls['precioUnitario'].value,
        );

        if (
          this.formulario.controls['cantidad'].value >
          this.formulario.controls['stockProducto'].value
        ) {
          this.formulario.controls['cantidad'].setErrors({
            exceedsStock: true,
          });
        } else {
          this.formulario.controls['cantidad'].setErrors(null);
        }
      }
    });
  }

  guardar(): void {
    const formulario = this.formulario.getRawValue();

    if (formulario.cantidad > formulario.stockProducto) {
      alert(
        'La cantidad de la transacción no puede ser mayor al stock disponible del producto.',
      );
      this.formulario.controls['cantidad'].setErrors({ exceedsStock: true });
      return;
    }

    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      alert(
        'Por favor, complete todos los campos requeridos y corrija los errores antes de guardar.',
      );
      return;
    }
    //...this.formulario.getRawValue(),

    const transaccion: Transaccion = {
      id: formulario.id,
      cantidad: formulario.cantidad,
      detalle: formulario.detalle,
      estado: formulario.estado,
      idProducto: formulario.idProducto,
      fecha: this.datos.transaccion?.fecha ?? new Date(),
      precioTotal: Number(formulario.precioTotal),
      precioUnitario: Number(formulario.precioUnitario),
      tipo: formulario.TipoTransaccion,
    };
    console.log('asdsad', transaccion);
    this.referenciaDialogo.close(transaccion);
  }

  cancelar(): void {
    this.referenciaDialogo.close();
  }

  seleccionarProducto(producto?: Producto): void {
    this.formulario.patchValue({
      idProducto: producto?.id,
      nombreProducto: producto?.nombre,
      categoriaProducto: producto?.categoria,
      stockProducto: producto?.stock,
      precioUnitario: producto?.precioUnitario,
    });
    this.isVistaProductoVisible = !this.isVistaProductoVisible;
  }

  cambiarVistaProducto() {
    this.isVistaProductoVisible = !this.isVistaProductoVisible;
  }

  buscarProductos() {
    let producto: Producto = {
      nombre: this.formulario.value.nombreBusquedaProducto,
    };

    this.conexionProductos.ObtenerProductosFiltros(producto).subscribe({
      next: (respuesta) => {
        const datos = respuesta as unknown as {
          resultado?: Producto[];
        };
        this.listaProductos = Array.isArray(respuesta)
          ? respuesta
          : datos.resultado || [];
      },
    });
  }
}
