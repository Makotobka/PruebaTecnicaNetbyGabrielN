import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransaccionesComponent } from './Template/transacciones/transacciones.component';
import { InicioComponent } from './Template/inicio/inicio.component';
import { ProductosComponent } from './Template/productos/productos.component';

const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' }, //Defaul URL
  { path: '**', redirectTo: 'inicio' }, //Defaul URL

  { path: 'transacciones', component: TransaccionesComponent },
  { path: 'productos', component: ProductosComponent },
  { path: 'inicio', component: InicioComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
