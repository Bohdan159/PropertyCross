import { Component, OnInit } from '@angular/core';
import {IListing} from '../../shared/Interfaces/IListing';
import {ActivatedRoute} from '@angular/router';
import {FavouritesService} from '../../shared/services/favourites.service';

@Component({
  selector: 'app-location-detail',
  templateUrl: './location-detail.component.html',
  styleUrls: ['./location-detail.component.css']
})
export class LocationDetailComponent implements OnInit {
  listing: IListing;
  index: number;
  buttonText: string;

  constructor(private activateRoute: ActivatedRoute, private favouriteService: FavouritesService) { }

  ngOnInit() {
    this.activateRoute.params.subscribe(params => this.index = params['id']);
    this.listing = JSON.parse(localStorage.getItem('response')).listings[this.index];
    if (this.favouriteService.existFavourite(this.listing)) {
      this.buttonText = '-';
    } else {
      this.buttonText = '+';
    }
  }

  toggleToFavourites() {
    if (this.favouriteService.existFavourite(this.listing)) {
      this.favouriteService.deleteFavourite(this.listing);
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
}
