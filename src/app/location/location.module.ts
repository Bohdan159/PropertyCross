import {NgModule} from '@angular/core';
import {LocationComponent} from './location.component';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    RouterModule
  ],
  exports: [LocationComponent],
  declarations: [LocationComponent]
})
export class LocationModule { }
