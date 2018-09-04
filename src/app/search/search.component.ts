import {Component, ErrorHandler, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';
import {SearchService} from '../shared/services/search.service';
import {takeUntil} from 'rxjs/operators';
import {INestoriaAnswer} from '../shared/Interfaces/INestoriaAnswer';
import {IRequest} from '../shared/Interfaces/IRequest';
import {IResponse} from '../shared/Interfaces/IResponse';
import {texts_const} from '../shared/constants/textsConst';
import {responseInvalidCodes, responseValidCodes} from '../shared/constants/responseCodes';
import {errorMessages} from '../shared/constants/errorMessages';
import {RecentSearchesService} from '../shared/services/recentSearches.service';
import {IRecentSearches} from '../shared/Interfaces/IRecentSearches';
import {text} from '@angular/core/src/render3/instructions';
import {IPosition} from '../shared/Interfaces/IPosition';
import {IError} from '../shared/Interfaces/IError';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnDestroy {
  form: FormGroup;
  customRequest: IRequest;
  customResponse: IResponse;
  recentSearches: IRecentSearches[];

  error: string;
  instructional_text: string = texts_const.SEARCH_INSTRUCTIONAL_TEXT;
  text: string = texts_const.SEARCHES_TEXT;

  private destroyStream = new Subject<void>();

  constructor(
    private router: Router,
    private builder: FormBuilder,
    private searchService: SearchService,
    private recentSearchesService: RecentSearchesService
  ) {
  }

  ngOnInit() {
    this.form = this.builder.group({
      place: ['']
    });
    this.recentSearches = this.recentSearchesService.getRequests();
  }

  ngOnDestroy() {
    this.destroyStream.next();
  }

  search() {
    const place_input = this.form.get('place');

    if (this.form.invalid) {
      place_input.markAsDirty();
      return;
    }

    this.searchService
      .primitiveSearch(place_input.value)
      .pipe(takeUntil(this.destroyStream))
      .subscribe(({response, request}: INestoriaAnswer) => {
        this.checkResponseCodes(response, request);
      });
  }

  optimizeNestoriaAnswer(response: IResponse, request: IRequest) {
    this.customRequest = {
      country: request.country,
      language: request.language,
      listing_type: request.listing_type,
      location: request.location,
      num_res: request.num_res,
      offset: request.offset,
      page: request.page,
      pretty: request.pretty
    };

    this.customResponse = {
      application_response_code: response.application_response_code,
      listings: response.listings,
      locations: response.locations,
      page: response.page,
      total_pages: response.total_pages,
      total_results: response.total_results
    };

    localStorage.setItem('response', JSON.stringify(this.customResponse));
    localStorage.setItem('request', JSON.stringify(this.customRequest));
  }

  checkResponseCodes(response: IResponse, request: IRequest) {
    switch (response.application_response_code) {
      case responseValidCodes[0]: case responseValidCodes[1]: case responseValidCodes[2]: {
        console.log();
        if (!response.listings.length) {
          this.error = errorMessages.ZERO_PROPERTIES;
          return;
        }
        this.optimizeNestoriaAnswer(response, request);
        this.recentSearchesService.addRequest({name_place: response.locations[0].long_title, total_results: response.total_results});
        this.navigate('/locations');
        break;
      }
      case responseInvalidCodes[0]: case responseInvalidCodes[1]: {
        if (!response.listings.length) {
          this.error = errorMessages.LOCATION_NOT_MATCHED;
          return;
        }
        this.customResponse = response;
        this.text = texts_const.LOCATION_TEXT;
        break;
      }
      default: {
        this.error = errorMessages.NETWORK_CONNECTION_ISSUE;
      }
    }
  }

  searchMyLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        this.requestForSearchMyLocation.bind(this),
        this.handleLocationError.bind(this),
        {timeout: 5000}
        );
    }
  }

  requestForSearchMyLocation(position: IPosition) {
    this.searchService
      .myLocationSearch(position.coords.latitude, position.coords.longitude)
      .subscribe(({response, request}: INestoriaAnswer) => {
        this.optimizeNestoriaAnswer(response, request);
        this.navigate('/locations');
      });
  }

  handleLocationError(error: IError) {
    console.log(error);
    switch (error.code) {
      case 3: {
        this.error = errorMessages.LOCATION_NOT_FOUND;
        break;
      }
      case 2: case 1: {
        this.error = errorMessages.LOCATION_NOT_ENABLED;
      }
    }
  }

  navigate(route: string) {
    this.router.navigate([route]);
  }

  clarifyRequest(place: string) {
    this.searchService
      .primitiveSearch(place)
      .pipe(takeUntil(this.destroyStream))
      .subscribe( ({response, request}: INestoriaAnswer) => {
        this.checkResponseCodes(response, request);
      });
  }
}

