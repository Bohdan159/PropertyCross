import {Injectable} from '@angular/core';
import {IListing} from '../Interfaces/IListing';

@Injectable()
export class FavoritesService {
  private favoriteArray: IListing[] = [];

  constructor() { }

  getFavorites(): IListing[] {
    return this.favoriteArray;
  }

  existFavorite(favorite: IListing) {
    return this.favoriteArray.includes(favorite);
  }

  addFavorite(favorite: IListing) {
    this.favoriteArray.push(favorite);
  }
  deleteFavorite(favotire: IListing) {
    this.favoriteArray.splice(this.favoriteArray.indexOf(favotire), 1);
  }
}
