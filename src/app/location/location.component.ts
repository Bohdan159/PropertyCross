import {Component, OnDestroy, OnInit} from '@angular/core';
import {IListing} from '../shared/Interfaces/IListing';
import {Router} from '@angular/router';
import {texts_const} from '../shared/constants/textsConst';
import {INestoriaAnswer} from '../shared/Interfaces/INestoriaAnswer';
import {SearchService} from '../services/search.service';
import {IResponse} from '../shared/Interfaces/IResponse';
import {IRequest} from '../shared/Interfaces/IRequest';
import {LocalStorageService} from '../services/localStorage.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit, OnDestroy {
  text: string = texts_const.LOAD_MORE;

  listingArray: IListing[] = [];
  countListings: number;
  search_term: string;
  total_results: number;

  private total_pages: number;
  private page: number;
  private num_of_res: number;
  private place_name: string;
  private lat: number;
  private lng: number;
  private destroyStream = new Subject<void>();

  constructor(private router: Router,
              private searchService: SearchService,
              private localStorageService: LocalStorageService
  ) { }

  ngOnInit() {
    const response = this.localStorageService.getItem<IResponse>('Response');
    const request = this.localStorageService.getItem<IRequest>('Request');

    this.initComponent(response, request);
    response.listings.forEach((item, index) => {
      item.index_location = index;
    });
    this.factoryObject(response, request);
  }

  ngOnDestroy() {
    this.destroyStream.next();
  }

  private initComponent({total_pages, locations}: IResponse, {location}: IRequest) {
    if (location.includes('coord')) {
      const requestLocation = location.replace('_', '').split(',');
      this.lat = (+requestLocation[1] + +requestLocation[3]) / 2;
      this.lng = (+requestLocation[2] + +requestLocation[4]) / 2;
    } else {
      this.place_name = location;
    }

    this.total_pages = total_pages;
    this.search_term = locations[0].long_title;
  }

  private factoryObject({listings, page, total_results}: IResponse, {num_res}: IRequest) {
    this.num_of_res = +num_res;
    this.listingArray = this.listingArray.concat(listings);
    this.page = page;
    this.total_results = total_results;

    if (this.page * this.num_of_res >= this.total_results) {
      this.countListings = this.total_results;
    } else {
      this.countListings = this.page * this.num_of_res;
    }
  }

  loadMore() {
    this.text = texts_const.LOADING;

    if (this.place_name) {
      this.searchService
        .placeNameSearch(this.place_name, this.page + 1)
        .pipe(takeUntil(this.destroyStream))
        .subscribe(({response, request}: INestoriaAnswer) => {
          this.text = texts_const.LOAD_MORE;
          this.factoryObject(response, request);
        });
      return;
    }

    this.searchService
      .centrePointSearch(this.lat, this.lng, this.page + 1)
      .pipe(takeUntil(this.destroyStream))
      .subscribe(({response, request}: INestoriaAnswer) => {
        this.text = texts_const.LOAD_MORE;
        this.factoryObject(response, request);
      });
  }

  hideLoadButton(): boolean {
    return this.countListings !== this.total_results;
  }
}
