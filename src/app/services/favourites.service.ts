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

  existFavourite(favourite: IListing): boolean {
    return this.favouriteArray.some((item): boolean => {
      return item.lister_url === favourite.lister_url;
    });
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
