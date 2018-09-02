import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ButtonModule} from '../shared/button/button.module';
import {HeaderComponent} from './header.component';

@NgModule({
  imports: [
    CommonModule,
    ButtonModule
  ],
  exports: [HeaderComponent],
  declarations: [HeaderComponent]
})
export class HeaderModule { }
