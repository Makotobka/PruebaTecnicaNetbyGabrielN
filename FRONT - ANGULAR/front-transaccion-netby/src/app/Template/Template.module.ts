import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { componentesPlantilla } from './template.export';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatIconModule,
    MatSlideToggleModule,
  ],
  declarations: componentesPlantilla,
  exports: componentesPlantilla,
})
export class TemplateModule {}
