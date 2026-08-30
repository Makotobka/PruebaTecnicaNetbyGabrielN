import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { ConexionService } from '../../Service/conexion.service';
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
  filtroEstado: boolean | null = null;
  enviando = false;
  mensaje = '';
  error = '';

  constructor(
    private readonly servicioConexion: ConexionService,
    private readonly dialogo: MatDialog,
  ) {}

  ngOnInit(): void {
    this.cargarProductos();
  }

  get productosFiltrados(): Producto[] {
    const nombre = this.filtroNombre.trim().toLocaleLowerCase();
    return this.productos.filter((producto) => {
      const coincideNombre =
        !nombre || producto.nombre?.toLocaleLowerCase().includes(nombre);
      const coincideEstado =
        this.filtroEstado === null || producto.estado === this.filtroEstado;
      return coincideNombre && coincideEstado;
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
  }

  limpiarFiltros(): void {
    this.filtroNombre = '';
    this.filtroEstado = null;
    this.mensaje = '';
  }

  abrirNuevo(): void {
    this.abrirDialogoProducto();
  }

  editarProducto(producto: Producto): void {
    this.abrirDialogoProducto(producto);
  }

  guardarProducto(producto: Producto): void {
    this.enviando = true;
    const solicitud = producto.idProducto
      ? this.servicioConexion.ModificarProducto(producto)
      : this.servicioConexion.InsertarProducto(producto);

    solicitud.subscribe({
      next: () => {
        this.enviando = false;
        this.mensaje = producto.idProducto
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
      !producto.idProducto ||
      !confirm(`¿Deseas eliminar el producto "${producto.nombre}"?`)
    ) {
      return;
    }
    this.servicioConexion.EliminarProducto(producto.idProducto).subscribe({
      next: () => {
        this.mensaje = 'Producto eliminado correctamente.';
        this.cargarProductos();
      },
      error: () => {
        this.error = 'No fue posible eliminar el producto.';
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
