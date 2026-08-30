import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { ConexionProductosService } from '../../Service/conexion-productos.service';
import { Producto } from '../../Shared/Interaces/DtoProductos';
import { DialogoProductoComponent } from './dialogo-producto/dialogo-producto.component';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss'],
})
export class ProductosComponent implements OnInit {
  readonly ColumnMode = ColumnMode;
  readonly ordenInicial = [{ prop: 'nombre', dir: 'asc' }];
  readonly mensajesTabla = {
    emptyMessage: 'No existen registros',
    totalMessage: 'productos',
  };

  productos: Producto[] = [];
  filtroNombre = '';
  filtroCategoria = '';
  filtroEstado: boolean | null = null;
  enviando = false;
  mensaje = '';
  error = '';

  constructor(
    private readonly servicioConexion: ConexionProductosService,
    private readonly dialogo: MatDialog,
  ) {}

  ngOnInit(): void {
    this.cargarProductos();
  }

  get productosFiltrados(): Producto[] {
    const nombre = this.filtroNombre.trim().toLocaleLowerCase();
    const categoria = this.filtroCategoria.trim().toLocaleLowerCase();
    return this.productos.filter((producto) => {
      const coincideNombre =
        !nombre || producto.nombre?.toLocaleLowerCase().includes(nombre);
      const coincideCategoria =
        !categoria ||
        producto.categoria?.toLocaleLowerCase().includes(categoria);
      const coincideEstado =
        this.filtroEstado === null || producto.estado === this.filtroEstado;
      return coincideNombre && coincideCategoria && coincideEstado;
    });
  }

  cargarProductos(): void {
    this.error = '';
    this.servicioConexion.ObtenerProductos().subscribe({
      next: (respuesta) => {
        const datos = respuesta as unknown as {
          datos?: Producto[];
          resultado?: Producto[];
        };
        this.productos = Array.isArray(respuesta)
          ? respuesta
          : datos.datos || datos.resultado || [];
      },
      error: () => {
        this.error =
          'No fue posible cargar los productos. Verifica que el backend esté ejecutándose.';
        this.productos = [];
      },
    });
  }

  buscar(): void {
    this.mensaje = '';
    this.cargarProductos();
  }

  limpiarFiltros(): void {
    this.filtroNombre = '';
    this.filtroEstado = null;
    this.mensaje = '';
    this.productos = [];
  }

  abrirNuevo(): void {
    this.abrirDialogoProducto();
  }

  editarProducto(producto: Producto): void {
    this.abrirDialogoProducto(producto);
  }

  guardarProducto(producto: Producto): void {
    this.enviando = true;
    const solicitud = producto.id
      ? this.servicioConexion.ModificarProducto(producto)
      : this.servicioConexion.InsertarProducto(producto);
    console.log('Solicitud enviada:', producto);
    solicitud.subscribe({
      next: () => {
        this.enviando = false;
        this.mensaje = producto.id
          ? 'Producto actualizado correctamente.'
          : 'Producto creado correctamente.';
        this.cargarProductos();
      },
      error: () => {
        this.enviando = false;
        this.error =
          'No fue posible guardar el producto. Revisa los datos e inténtalo otra vez.';
      },
    });
  }

  eliminarProducto(producto: Producto): void {
    if (
      !producto.id ||
      !confirm(`¿Deseas eliminar el producto "${producto.nombre}"?`)
    ) {
      return;
    }
    this.servicioConexion.EliminarProducto(producto.id).subscribe({
      next: () => {
        this.mensaje = 'Producto eliminado correctamente.';
        this.cargarProductos();
      },
      error: () => {
        this.error = 'No fue posible eliminar el producto.';
      },
    });
  }

  activarProducto(producto: Producto): void {
    if (
      !producto.id ||
      !confirm(`¿Deseas activar el producto "${producto.nombre}"?`)
    ) {
      return;
    }
    this.servicioConexion.ActivarProducto(producto).subscribe({
      next: () => {
        this.mensaje = 'Producto activado correctamente.';
        this.cargarProductos();
      },
      error: () => {
        this.error = 'No fue posible activar el producto.';
      },
    });
  }

  etiquetaEstado(producto: Producto): string {
    return producto.estado === false ? 'Inactivo' : 'Activo';
  }

  private abrirDialogoProducto(producto?: Producto): void {
    this.error = '';
    const referencia = this.dialogo.open(DialogoProductoComponent, {
      width: '650px',
      maxWidth: 'calc(100vw - 32px)',
      disableClose: true,
      autoFocus: false,
      data: { producto },
    });
    referencia.afterClosed().subscribe((resultado?: Producto) => {
      if (resultado) {
        this.guardarProducto(resultado);
      }
    });
  }
}
