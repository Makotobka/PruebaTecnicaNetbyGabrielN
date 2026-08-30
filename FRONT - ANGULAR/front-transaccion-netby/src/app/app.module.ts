import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductosComponent } from './View/productos/productos.component';
import { TransaccionesComponent } from './View/transacciones/transacciones.component';
import { TemplateModule } from './Template/Template.module';

@NgModule({
  declarations: [AppComponent, ProductosComponent, TransaccionesComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    TemplateModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
