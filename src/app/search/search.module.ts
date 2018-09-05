import {NgModule} from '@angular/core';
import {SearchComponent} from './search.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [SearchComponent],
  declarations: [SearchComponent]
})
export class SearchModule { }
