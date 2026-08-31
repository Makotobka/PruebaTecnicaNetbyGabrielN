import { ConexionTransaccionService } from './../../Service/conexion-transaccion.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { DialogoTransaccionesComponent } from './dialogo-transacciones/dialogo-transacciones.component';
import {
  Transaccion,
  TransaccionProducto,
} from 'src/app/Shared/Interaces/DtoTransacciones';

@Component({
  selector: 'app-transacciones',
  templateUrl: './transacciones.component.html',
  styleUrls: ['./transacciones.component.scss'],
})
export class TransaccionesComponent implements OnInit {
  readonly ColumnMode = ColumnMode;
  readonly ordenInicial = [{ prop: 'nombre', dir: 'asc' }];
  readonly mensajesTabla = {
    emptyMessage: 'No existen registros',
    totalMessage: 'productos',
  };

  transacciones: Transaccion[] = [];
  filtroNombre = '';
  filtroCategoria = '';
  filtroEstado: boolean | null = null;
  filtroFechaInicio = '';
  filtroFechaFin = '';
  filtroTipo = '';
  enviando = false;
  mensaje = '';
  error = '';

  constructor(
    private readonly servicioConexion: ConexionTransaccionService,
    private readonly dialogo: MatDialog,
  ) {}

  ngOnInit(): void {
    this.cargarTransacciones();
  }

  cargarTransacciones(): void {
    this.error = '';
    this.servicioConexion.ObtenerTransaccionesProducto().subscribe({
      next: (respuesta) => {
        const datos = respuesta as unknown as {
          datos?: TransaccionProducto[];
          resultado?: TransaccionProducto[];
        };
        this.transacciones = Array.isArray(respuesta)
          ? respuesta
          : datos.datos || datos.resultado || [];
      },
      error: () => {
        this.error =
          'No fue posible cargar las transacciones. Verifica que el backend esté ejecutándose.';
        this.transacciones = [];
      },
    });
  }

  buscar(): void {
    this.mensaje = '';
    this.cargarTransacciones();
  }

  limpiarFiltros(): void {
    this.filtroNombre = '';
    this.filtroEstado = null;
    this.filtroFechaInicio = '';
    this.filtroFechaFin = '';
    this.filtroTipo = '';
    this.mensaje = '';
    this.transacciones = [];
  }

  abrirNuevo(): void {
    this.abrirDialogoProducto();
  }

  editarProducto(transaccion: Transaccion): void {
    this.abrirDialogoProducto(transaccion);
  }

  guardartransaccion(transaccion: Transaccion): void {
    this.enviando = true;
    const solicitud = transaccion.id
      ? this.servicioConexion.ModificarTransaccion(transaccion)
      : this.servicioConexion.InsertarTransaccion(transaccion);
    console.log('Solicitud enviada:', transaccion);
    solicitud.subscribe({
      next: () => {
        this.enviando = false;
        this.mensaje = transaccion.id
          ? 'Producto actualizado correctamente.'
          : 'Producto creado correctamente.';
        this.cargarTransacciones();
      },
      error: () => {
        this.enviando = false;
        this.error =
          'No fue posible guardar el producto. Revisa los datos e inténtalo otra vez.';
      },
    });
  }

  eliminarProducto(transaccion: Transaccion): void {
    // if (
    //   !producto.id ||
    //   !confirm(`¿Deseas eliminar el producto "${producto.nombre}"?`)
    // ) {
    //   return;
    // }
    // this.servicioConexion.EliminarProducto(producto.id).subscribe({
    //   next: () => {
    //     this.mensaje = 'Producto eliminado correctamente.';
    //     this.cargarProductos();
    //   },
    //   error: () => {
    //     this.error = 'No fue posible eliminar el producto.';
    //   },
    // });
  }

  activarProducto(transaccion: Transaccion): void {
    // if (
    //   !producto.id ||
    //   !confirm(`¿Deseas activar el producto "${producto.nombre}"?`)
    // ) {
    //   return;
    // }
    // this.servicioConexion.ActivarProducto(producto).subscribe({
    //   next: () => {
    //     this.mensaje = 'Producto activado correctamente.';
    //     this.cargarProductos();
    //   },
    //   error: () => {
    //     this.error = 'No fue posible activar el producto.';
    //   },
    // });
  }

  etiquetaEstado(transaccion: Transaccion): string {
    return transaccion.estado === false ? 'Inactivo' : 'Activo';
  }

  private abrirDialogoProducto(transaccion?: Transaccion): void {
    this.error = '';
    const referencia = this.dialogo.open(DialogoTransaccionesComponent, {
      width: '650px',
      maxWidth: 'calc(100vw - 32px)',
      disableClose: true,
      autoFocus: false,
      data: { transaccion },
    });
    referencia.afterClosed().subscribe((resultado?: Transaccion) => {
      if (resultado) {
        this.guardartransaccion(resultado);
      }
    });
  }

  abrirDetalle(transaccion: Transaccion): void {}
}
