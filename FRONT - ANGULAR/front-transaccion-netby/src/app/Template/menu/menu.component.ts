import { Component, Input } from '@angular/core';

interface OpcionMenu {
  etiqueta: string;
  icono: string;
  ruta?: string;
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  @Input() contraido = false;

  readonly opciones: OpcionMenu[] = [
    { etiqueta: 'Productos', icono: 'inventory_2', ruta: '/productos' },
    { etiqueta: 'Transacciones', icono: 'swap_horiz', ruta: '/transacciones' },
  ];
}
