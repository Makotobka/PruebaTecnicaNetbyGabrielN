import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransaccionesComponent } from './View/transacciones/transacciones.component';
import { ProductosComponent } from './View/productos/productos.component';

const routes: Routes = [
  // { path: '', redirectTo: 'inicio', pathMatch: 'full' }, //Defaul URL
  // { path: '**', redirectTo: 'inicio' }, //Defaul URL

  { path: 'transacciones', component: TransaccionesComponent },
  { path: 'productos', component: ProductosComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
