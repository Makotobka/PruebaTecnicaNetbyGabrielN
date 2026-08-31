import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Producto } from '../Shared/Interaces/DtoProductos';
import { RUTAS_APIS_PRODUCTOS } from '../Shared/Constantes/rutasApi';
import { UtilService } from './util.service';

@Injectable({
  providedIn: 'root',
})
export class ConexionProductosService {
  private URL_SERVICE_PRODUCTO: string;

  constructor(
    private httpClient: HttpClient,
    private utilService: UtilService,
  ) {
    this.URL_SERVICE_PRODUCTO = environment.serviceUrlProducto;
  }

  InsertarProducto(dto: Producto): Observable<Producto> {
    const url =
      this.URL_SERVICE_PRODUCTO + RUTAS_APIS_PRODUCTOS.POST_INSERTAR_PRODUCTO;
    const body = JSON.stringify(dto);
    return this.httpClient.post<Producto>(
      url,
      body,
      this.utilService.adjuntarUsuario(),
    );
  }

  ObtenerProductos(): Observable<Producto[]> {
    const url =
      this.URL_SERVICE_PRODUCTO +
      RUTAS_APIS_PRODUCTOS.GET_OBTENER_TODOS_PRODUCTOS;
    return this.httpClient.get<Producto[]>(
      url,
      this.utilService.adjuntarUsuario(),
    );
  }

  ObtenerProductosFiltros(producto?: Producto): Observable<Producto[]> {
    const url =
      this.URL_SERVICE_PRODUCTO +
      RUTAS_APIS_PRODUCTOS.POST_OBTENER_PRODUCTOS_FILTROS;
    const body = producto ? JSON.stringify(producto) : null;
    return this.httpClient.post<Producto[]>(
      url,
      body,
      this.utilService.adjuntarUsuario(),
    );
  }

  EliminarProducto(idProducto: string): Observable<any> {
    const url =
      this.URL_SERVICE_PRODUCTO +
      RUTAS_APIS_PRODUCTOS.DELETE_ELIMINAR_PRODUCTO +
      idProducto;
    return this.httpClient.delete<void>(
      url,
      this.utilService.adjuntarUsuario(),
    );
  }
  ActivarProducto(dto: Producto): Observable<Producto> {
    const url =
      this.URL_SERVICE_PRODUCTO +
      RUTAS_APIS_PRODUCTOS.PUT_ACTIVAR_PRODUCTO +
      dto.id;
    return this.httpClient.put<Producto>(
      url,
      null,
      this.utilService.adjuntarUsuario(),
    );
  }
  ModificarProducto(dto: Producto): Observable<Producto> {
    const url =
      this.URL_SERVICE_PRODUCTO +
      RUTAS_APIS_PRODUCTOS.PUT_MODIFICAR_PRODUCTO +
      dto.id;
    const body = JSON.stringify(dto);
    return this.httpClient.put<Producto>(
      url,
      body,
      this.utilService.adjuntarUsuario(),
    );
  }
}
