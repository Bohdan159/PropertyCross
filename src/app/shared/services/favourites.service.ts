import {Injectable} from '@angular/core';
import {IListing} from '../Interfaces/IListing';

@Injectable()
export class FavouritesService {
  private favouriteArray: IListing[] = [];

  constructor() { }

  getFavourites(): IListing[] {
    return this.favouriteArray;
  }

  existFavourite(favourite: IListing) {
    return this.favouriteArray.some((item) => {
      return item.lister_url === favourite.lister_url;
    });
  }

  addFavourite(favourite: IListing) {
    this.favouriteArray.push(favourite);
  }
  deleteFavourite(favourite: IListing) {
    this.favouriteArray.splice(this.favouriteArray.indexOf(favourite), 1);
  }
}
