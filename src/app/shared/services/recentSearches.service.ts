import {Injectable} from '@angular/core';
import {IRecentSearches} from '../Interfaces/IRecentSearches';

@Injectable()
export class RecentSearchesService {
  private recentSearches: IRecentSearches[] = [];

  constructor() { }

  getRequests(): IRecentSearches[] {
    return this.recentSearches;
  }

  addRequest(recentSearch: IRecentSearches) {
    this.recentSearches.push(recentSearch);
  }
}
