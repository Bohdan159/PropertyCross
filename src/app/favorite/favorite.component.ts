import {Component, OnInit} from '@angular/core';
import {FavoritesService} from '../shared/services/favorites.service';
import {IListing} from '../shared/Interfaces/IListing';
import {Router} from '@angular/router';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent implements OnInit {
  favoriteArray: IListing[];

  constructor(private favoriteService: FavoritesService,
              private router: Router) { }

  ngOnInit() {
    this.favoriteArray = this.favoriteService.getFavorites();
  }

  showDetails(index) {
    this.router.navigate(['/locations/detail', index]);
  }
}
