import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RUTAS_APIS_TRANSACCIONES } from '../Shared/Constantes/rutasApi';
import {
  Transaccion,
  TransaccionProducto,
} from '../Shared/Interaces/DtoTransacciones';
import { UtilService } from './util.service';

@Injectable({
  providedIn: 'root',
})
export class ConexionTransaccionService {
  private URL_SERVICE_TRANSACCION: string;

  constructor(
    private httpClient: HttpClient,
    private utilService: UtilService,
  ) {
    this.URL_SERVICE_TRANSACCION = environment.serviceUrlTransaccion;
  }

  InsertarTransaccion(dto: Transaccion): Observable<Transaccion> {
    const url =
      this.URL_SERVICE_TRANSACCION +
      RUTAS_APIS_TRANSACCIONES.POST_INSERTAR_TRANSACCION;
    const body = JSON.stringify(dto);
    console.log(dto);
    return this.httpClient.post<Transaccion>(
      url,
      body,
      this.utilService.adjuntarUsuario(),
    );
  }
  ObtenerTransacciones(): Observable<Transaccion[]> {
    const url =
      this.URL_SERVICE_TRANSACCION +
      RUTAS_APIS_TRANSACCIONES.GET_OBTENER_TRANSACCIONES;
    return this.httpClient.get<Transaccion[]>(
      url,
      this.utilService.adjuntarUsuario(),
    );
  }

  ObtenerTransaccionesProducto(): Observable<TransaccionProducto[]> {
    const url =
      this.URL_SERVICE_TRANSACCION +
      RUTAS_APIS_TRANSACCIONES.GET_OBTENER_TRANSACCIONES_PRODUCTO;
    return this.httpClient.get<TransaccionProducto[]>(
      url,
      this.utilService.adjuntarUsuario(),
    );
  }

  EliminarTransaccion(idTransaccion: string): Observable<any> {
    const url =
      this.URL_SERVICE_TRANSACCION +
      RUTAS_APIS_TRANSACCIONES.DELETE_ELIMINAR_TRANSACCION +
      '/' +
      idTransaccion;
    return this.httpClient.delete<void>(
      url,
      this.utilService.adjuntarUsuario(),
    );
  }

  ModificarTransaccion(dto: Transaccion): Observable<Transaccion> {
    const url =
      this.URL_SERVICE_TRANSACCION +
      RUTAS_APIS_TRANSACCIONES.PUT_MODIFICAR_TRANSACCION;
    const body = JSON.stringify(dto);
    return this.httpClient.put<Transaccion>(
      url,
      body,
      this.utilService.adjuntarUsuario(),
    );
  }
}
