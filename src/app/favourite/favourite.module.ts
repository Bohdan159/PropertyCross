import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FavouriteComponent} from './favourite.component';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [FavouriteComponent],
  declarations: [FavouriteComponent]
})
export class FavouriteModule { }
