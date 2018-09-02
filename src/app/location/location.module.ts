import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationComponent } from './location.component';
import {ButtonModule} from '../shared/button/button.module';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    ButtonModule,
    RouterModule
  ],
  exports: [LocationComponent],
  declarations: [LocationComponent]
})
export class LocationModule { }
