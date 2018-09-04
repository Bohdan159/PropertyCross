import {Component, OnInit} from '@angular/core';
import {FavouritesService} from '../shared/services/favourites.service';
import {IListing} from '../shared/Interfaces/IListing';
import {Router} from '@angular/router';
import {texts_const} from '../shared/constants/textsConst';

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.css']
})
export class FavouriteComponent implements OnInit {
  favouriteArray: IListing[];
  errorText: string = texts_const.FAVOURITE_ERROR_TEXT;

  constructor(private favouriteService: FavouritesService,
              private router: Router) { }

  ngOnInit() {
    this.favouriteArray = this.favouriteService.getFavourites();
  }

  showDetails(index: number) {
    this.router.navigate(['/locations/detail', index]);
  }
}
