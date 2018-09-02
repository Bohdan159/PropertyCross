import { Component, OnInit } from '@angular/core';
import {IListing} from '../../shared/Interfaces/IListing';
import {ActivatedRoute} from '@angular/router';
import {FavoritesService} from '../../shared/services/favorites.service';

@Component({
  selector: 'app-location-detail',
  templateUrl: './location-detail.component.html',
  styleUrls: ['./location-detail.component.css']
})
export class LocationDetailComponent implements OnInit {
  listing: IListing;
  index: number;
  text = '+';

  constructor(private activateRoute: ActivatedRoute, private favoriteService: FavoritesService) { }

  ngOnInit() {
    this.activateRoute.params.subscribe(params => this.index = params['id']);
    this.listing = JSON.parse(localStorage.getItem('response')).listings[this.index];
  }

  toggleToFavorites() {
    if (this.favoriteService.existFavorite(this.listing)) {
      this.favoriteService.deleteFavorite(this.listing);
      this.text = '+';
    } else {
      this.favoriteService.addFavorite(this.listing);
      this.text = '-';
    }
  }
}
