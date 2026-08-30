import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

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

  InsertarProducto(dto: producto): Observable<any> {
    const url = this.URL_SERVICE + RUTAS_APIS_PRODUCTOS.INSERTAR_PRODUCTO;
    const body = JSON.stringify(dto);
    return this.httpClient.post<any[]>(url, body, httpOptions);
  }
  InsertarTransaccion(dto: transaccion): Observable<any> {
    const url =
      this.URL_SERVICE + RUTAS_APIS_TRANSACCIONES.INSERTAR_TRANSACCION;
    const body = JSON.stringify(dto);
    return this.httpClient.post<any[]>(url, body, httpOptions);
  }
  ObtenerProductos(api: string): Observable<producto[]> {
    const url = this.URL_SERVICE + RUTAS_APIS_PRODUCTOS.OBTENER_PRODUCTOS;
    return this.httpClient.get<producto[]>(url, httpOptions);
  }
  ObtenerTransacciones(api: string): Observable<transaccion[]> {
    const url =
      this.URL_SERVICE + RUTAS_APIS_TRANSACCIONES.OBTENER_TRANSACCIONES;
    return this.httpClient.get<transaccion[]>(url, httpOptions);
  }
  EliminarProducto(idProducto: string): Observable<any> {
    const url =
      this.URL_SERVICE +
      RUTAS_APIS_PRODUCTOS.ELIMINAR_PRODUCTO +
      '/' +
      idProducto;
    return this.httpClient.delete<any[]>(url, httpOptions);
  }
  EliminarTransaccion(idTransaccion: string): Observable<any> {
    const url =
      this.URL_SERVICE +
      RUTAS_APIS_TRANSACCIONES.ELIMINAR_TRANSACCION +
      '/' +
      idTransaccion;
    return this.httpClient.delete<any[]>(url, httpOptions);
  }
  ModificarProducto(dto: producto): Observable<any> {
    const url = this.URL_SERVICE + RUTAS_APIS_PRODUCTOS.MODIFICAR_PRODUCTO;
    const body = JSON.stringify(dto);
    return this.httpClient.put<any[]>(url, body, httpOptions);
  }
  ModificarTransaccion(dto: transaccion): Observable<any> {
    const url =
      this.URL_SERVICE + RUTAS_APIS_TRANSACCIONES.MODIFICAR_TRANSACCION;
    const body = JSON.stringify(dto);
    return this.httpClient.put<any[]>(url, body, httpOptions);
  }
}
