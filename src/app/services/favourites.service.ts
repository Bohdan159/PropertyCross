import {Injectable} from '@angular/core';
import {IListing} from '../shared/Interfaces/IListing';

@Injectable({
  providedIn: 'root'
})
export class FavouritesService {
  private favouriteArray: IListing[] = [];

  getFavourites(): IListing[] {
    return this.favouriteArray;
  }

  addFavourite(favourite: IListing) {
    this.favouriteArray.push(favourite);
  }

  deleteFavourite(index) {
    this.favouriteArray.splice(index, 1);
  }

  findFavourite({lister_url}: IListing): number {
    let favouriteIndex = -1;
    this.favouriteArray.forEach((item, index) => {
      if (item.lister_url === lister_url) {
        return favouriteIndex = index;
      }
    });
    return favouriteIndex;
  }
}
