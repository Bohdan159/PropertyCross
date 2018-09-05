import {Component, OnInit} from '@angular/core';
import {FavouritesService} from '../services/favourites.service';
import {IListing} from '../shared/Interfaces/IListing';
import {texts_const} from '../shared/constants/textsConst';

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.scss']
})
export class FavouriteComponent implements OnInit {
  favouriteArray: IListing[];
  errorText: string = texts_const.FAVOURITE_ERROR_TEXT;

  constructor(private favouriteService: FavouritesService) { }

  ngOnInit() {
    this.favouriteArray = this.favouriteService.getFavourites();
  }
}
