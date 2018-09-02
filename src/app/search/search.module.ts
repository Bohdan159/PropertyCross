import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ButtonModule} from '../shared/button/button.module';
import {SearchComponent} from './search.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [SearchComponent],
  declarations: [SearchComponent]
})
export class SearchModule { }
