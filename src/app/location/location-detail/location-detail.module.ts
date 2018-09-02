import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ButtonModule} from '../../shared/button/button.module';
import {LocationDetailComponent} from './location-detail.component';

@NgModule({
  imports: [
    CommonModule,
    ButtonModule
  ],
  exports: [LocationDetailComponent],
  declarations: [LocationDetailComponent]
})
export class LocationDetailModule { }
