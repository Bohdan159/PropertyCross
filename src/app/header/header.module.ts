import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ButtonModule} from '../shared/components/button/button.module';
import {HeaderComponent} from './header.component';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    ButtonModule,
    RouterModule
  ],
  exports: [HeaderComponent],
  declarations: [HeaderComponent]
})
export class HeaderModule { }
