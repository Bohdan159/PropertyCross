import {Injectable} from '@angular/core';
import {IRecentSearches} from '../shared/Interfaces/IRecentSearches';

@Injectable({
  providedIn: 'root'
})
export class RecentSearchesService {
  private recentSearches: IRecentSearches[] = [];

  getRequests(): IRecentSearches[] {
    this.recentSearches = this.recentSearches.sort((currentItem: IRecentSearches, nextItem: IRecentSearches): number => {
      return nextItem.time - currentItem.time;
    });

    return this.recentSearches;
  }

  addRequest(recentSearch: IRecentSearches) {
    const index = this.findRequest(recentSearch.name_place);
    if (index === -1) {
      this.recentSearches.push(recentSearch);
    } else {
      this.recentSearches[index].time = recentSearch.time;
    }
  }

  private findRequest(name_place: string): number {
    let recentSearchIndex = -1;
    this.recentSearches.forEach((item, index) => {
      if (item.name_place === name_place) {
        return recentSearchIndex = index;
      }
    });
    return recentSearchIndex;
  }
}
