import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';
import {SearchService} from '../services/search.service';
import {takeUntil, timeout} from 'rxjs/operators';
import {INestoriaAnswer} from '../shared/Interfaces/INestoriaAnswer';
import {IRequest} from '../shared/Interfaces/IRequest';
import {IResponse} from '../shared/Interfaces/IResponse';
import {texts_const} from '../shared/constants/textsConst';
import {responseInvalidCodes, responseValidCodes} from '../shared/constants/responseCodes';
import {errorMessages} from '../shared/constants/errorMessages';
import {RecentSearchesService} from '../services/recentSearches.service';
import {IRecentSearches} from '../shared/Interfaces/IRecentSearches';
import {IPosition} from '../shared/Interfaces/IPosition';
import {IError} from '../shared/Interfaces/IError';
import {LocalStorageService} from '../services/localStorage.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {
  form: FormGroup;
  customResponse: IResponse;
  recentSearches: IRecentSearches[];

  error: string;
  instructional_text: string = texts_const.SEARCH_INSTRUCTIONAL_TEXT;
  text: string = texts_const.SEARCHES_TEXT;

  private customRequest: IRequest;
  private destroyStream = new Subject<void>();

  constructor(
    private router: Router,
    private builder: FormBuilder,
    private searchService: SearchService,
    private recentSearchesService: RecentSearchesService,
    private localStorageService: LocalStorageService
  ) {
  }

  ngOnInit() {
    this.initForm();
    this.placeNameChange();
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
      .placeNameSearch(place_input.value)
      .pipe(takeUntil(this.destroyStream))
      .pipe(timeout(5000))
      .subscribe(
        ({response, request}: INestoriaAnswer) => {
          this.checkResponseCodes(response, request);
        },
        () => {
          this.error = errorMessages.NETWORK_CONNECTION_ISSUE;
        });
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

  clarifyRequest(place: string) {
    this.searchService
      .placeNameSearch(place)
      .pipe(takeUntil(this.destroyStream))
      .pipe(timeout(5000))
      .subscribe(
        ({response, request}: INestoriaAnswer) => {
          this.checkResponseCodes(response, request);
        },
        () => {
          this.error = errorMessages.NETWORK_CONNECTION_ISSUE;
        });
  }

  private requestForSearchMyLocation(position: IPosition) {
    this.searchService
      .centrePointSearch()
      .pipe(takeUntil(this.destroyStream))
      .pipe(timeout(5000))
      .subscribe(({response, request}: INestoriaAnswer) => {
          this.checkResponseCodes(response, request);
        },
        () => {
          this.error = errorMessages.NETWORK_CONNECTION_ISSUE;
        });
  }

  private handleLocationError(error: IError) {
    switch (error.code) {
      case 3: {
        this.error = errorMessages.LOCATION_NOT_FOUND;
        break;
      }
      case 2:
      case 1: {
        this.error = errorMessages.LOCATION_NOT_ENABLED;
      }
    }
  }

  private checkResponseCodes(response: IResponse, request: IRequest) {
    switch (response.application_response_code) {
      case responseValidCodes[0]:
      case responseValidCodes[1]:
      case responseValidCodes[2]: {
        if (!response.listings.length) {
          this.error = errorMessages.ZERO_PROPERTIES;
          return;
        }
        this.optimizeNestoriaAnswer(response, request);

        this.recentSearchesService.addRequest({
          name_place: response.locations[0].long_title,
          total_results: response.total_results,
          time: Date.now()
        });

        this.recentSearches = this.recentSearchesService.getRequests();
        this.navigate('/locations');
        break;
      }
      case responseInvalidCodes[0]:
      case responseInvalidCodes[1]: {
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

  private optimizeNestoriaAnswer(response: IResponse, request: IRequest) {
    response.listings.forEach((item, index) => {
      item.index_location = index;
    });

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

    this.localStorageService.setItem('Response', this.customResponse);
    this.localStorageService.setItem('Request', this.customRequest);
  }

  private navigate(route: string) {
    this.router.navigate([route]);
  }

  private initForm() {
    this.form = this.builder.group({
      place: ['']
    });
  }

  private placeNameChange() {
    this.form.get('place')
      .valueChanges
      .pipe(takeUntil(this.destroyStream))
      .subscribe(() => {
        this.error = '';
      });
  }
}
