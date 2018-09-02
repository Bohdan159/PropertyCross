import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FavoriteComponent} from './favorite.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [FavoriteComponent],
  declarations: [FavoriteComponent]
})
export class FavoriteModule { }
