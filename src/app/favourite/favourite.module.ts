import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FavouriteComponent} from './favourite.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [FavouriteComponent],
  declarations: [FavouriteComponent]
})
export class FavouriteModule { }
