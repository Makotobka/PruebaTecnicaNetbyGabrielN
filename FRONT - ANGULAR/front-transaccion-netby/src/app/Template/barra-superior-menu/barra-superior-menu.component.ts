import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-barra-superior-menu',
  templateUrl: './barra-superior-menu.component.html',
  styleUrls: ['./barra-superior-menu.component.scss'],
})
export class BarraSuperiorMenuComponent implements OnInit, OnDestroy {
  @Output() cambioMenu = new EventEmitter<void>();

  fechaActual = new Date();
  contador: any;

  constructor() {}
  ngOnInit(): void {
    this.contador = setInterval(() => {
      this.fechaActual = new Date();
    }, 1000);
  }
  ngOnDestroy(): void {
    clearInterval(this.contador);
  }

  alternarMenu(): void {
    this.cambioMenu.emit();
  }
}
