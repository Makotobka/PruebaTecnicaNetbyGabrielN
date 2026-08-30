import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Producto } from '../Shared/Interaces/DtoProductos';
import { Transaccion } from '../Shared/Interaces/DtoTransacciones';
import { RUTAS_APIS_PRODUCTOS, RUTAS_APIS_TRANSACCIONES } from '../Shared/Constantes/rutasApi';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class ConexionService {
  private URL_SERVICE: string;

  constructor(private httpClient: HttpClient) {
    this.URL_SERVICE = environment.serviceUrl;
  }

  InsertarProducto(dto: Producto): Observable<Producto> {
    const url = this.URL_SERVICE + RUTAS_APIS_PRODUCTOS.INSERTAR_PRODUCTO;
    const body = JSON.stringify(dto);
    return this.httpClient.post<Producto>(url, body, httpOptions);
  }
  InsertarTransaccion(dto: Transaccion): Observable<Transaccion> {
    const url =
      this.URL_SERVICE + RUTAS_APIS_TRANSACCIONES.INSERTAR_TRANSACCION;
    const body = JSON.stringify(dto);
    return this.httpClient.post<Transaccion>(url, body, httpOptions);
  }
  ObtenerProductos(): Observable<Producto[]> {
    const url = this.URL_SERVICE + RUTAS_APIS_PRODUCTOS.OBTENER_PRODUCTOS;
    return this.httpClient.get<Producto[]>(url, httpOptions);
  }
  ObtenerTransacciones(): Observable<Transaccion[]> {
    const url =
      this.URL_SERVICE + RUTAS_APIS_TRANSACCIONES.OBTENER_TRANSACCIONES;
    return this.httpClient.get<Transaccion[]>(url, httpOptions);
  }
  EliminarProducto(idProducto: string): Observable<any> {
    const url =
      this.URL_SERVICE +
      RUTAS_APIS_PRODUCTOS.ELIMINAR_PRODUCTO +
      '/' +
      idProducto;
    return this.httpClient.delete<void>(url, httpOptions);
  }
  EliminarTransaccion(idTransaccion: string): Observable<any> {
    const url =
      this.URL_SERVICE +
      RUTAS_APIS_TRANSACCIONES.ELIMINAR_TRANSACCION +
      '/' +
      idTransaccion;
    return this.httpClient.delete<void>(url, httpOptions);
  }
  ModificarProducto(dto: Producto): Observable<Producto> {
    const url = this.URL_SERVICE + RUTAS_APIS_PRODUCTOS.MODIFICAR_PRODUCTO;
    const body = JSON.stringify(dto);
    return this.httpClient.put<Producto>(url, body, httpOptions);
  }
  ModificarTransaccion(dto: Transaccion): Observable<Transaccion> {
    const url =
      this.URL_SERVICE + RUTAS_APIS_TRANSACCIONES.MODIFICAR_TRANSACCION;
    const body = JSON.stringify(dto);
    return this.httpClient.put<Transaccion>(url, body, httpOptions);
  }
}
