import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilService {
  constructor() {}

  public adjuntarUsuario() {
    const usuarioCambio = localStorage.getItem('usuarioCambio');
    if (usuarioCambio === undefined || usuarioCambio === null)
      //Solo para pruebas, en produccion deberia sacar de algun login.
      localStorage.setItem('usuarioCambio', 'kinoshta');

    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-Usuario': usuarioCambio || 'usuario-prueba',
      }),
    };
  }
}
