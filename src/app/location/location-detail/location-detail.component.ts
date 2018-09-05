import {Component, OnDestroy, OnInit} from '@angular/core';
import {IListing} from '../../shared/Interfaces/IListing';
import {ActivatedRoute} from '@angular/router';
import {FavouritesService} from '../../services/favourites.service';
import {LocalStorageService} from '../../services/localStorage.service';
import {IResponse} from '../../shared/Interfaces/IResponse';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-location-detail',
  templateUrl: './location-detail.component.html',
  styleUrls: ['./location-detail.component.scss']
})
export class LocationDetailComponent implements OnInit, OnDestroy {
  listing: IListing;
  buttonText: string;

  private index: number;
  private destroyStream = new Subject<void>();

  constructor(private activateRoute: ActivatedRoute,
              private favouriteService: FavouritesService,
              private localStorageService: LocalStorageService
  ) { }

  ngOnInit() {
    this.initComponent();
  }

  ngOnDestroy() {
    this.destroyStream.next();
  }

  toggleToFavourites() {
    const index = this.favouriteService.findFavourite(this.listing);
    if (index !== -1) {
      this.favouriteService.deleteFavourite(index);
      this.buttonText = '+';
    } else {
      this.favouriteService.addFavourite(this.listing);
      this.buttonText = '-';
    }
  }

  formattedCount(count: number, title: string): string {
    if (count <= 0) {
      return '';
    }
    if (count === 1) {
      return count + ' ' + title;
    }
    if (count > 1) {
      return count + ' ' + title + 's';
    }
  }

  private initComponent() {
    this.activateRoute
      .params
      .pipe(takeUntil(this.destroyStream))
      .subscribe(params => this.index = params['id']);

    this.listing = this.localStorageService.getItem<IResponse>('Response').listings[this.index];
    this.buttonText = this.favouriteService.existFavourite(this.listing) ? '-' : '+';
  }
}
