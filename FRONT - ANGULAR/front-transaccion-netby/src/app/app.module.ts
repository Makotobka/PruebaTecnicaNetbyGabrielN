import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InicioComponent } from './Template/inicio/inicio.component';
import { ProductosComponent } from './Template/productos/productos.component';
import { TransaccionesComponent } from './Template/transacciones/transacciones.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    ProductosComponent,
    TransaccionesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
