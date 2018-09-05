import {NgModule} from '@angular/core';
import {LocationDetailComponent} from './location-detail.component';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  imports: [
    SharedModule
  ],
  exports: [LocationDetailComponent],
  declarations: [LocationDetailComponent]
})
export class LocationDetailModule { }
