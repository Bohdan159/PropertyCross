import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';
import {SearchService} from '../shared/services/search.service';
import {takeUntil} from 'rxjs/operators';
import {INestoriaAnswer} from '../shared/Interfaces/INestoriaAnswer';
import {IRequest} from '../shared/Interfaces/IRequest';
import {IResponse} from '../shared/Interfaces/IResponse';
import {text_const} from '../shared/constants/textsConst';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnDestroy {
  form: FormGroup;
  error: string;
  text: string = text_const.SEARCH_INSTRUCTIONAL_TEXT;
  private destroyStream = new Subject<void>();

  constructor(
    private router: Router,
    private builder: FormBuilder,
    private searchService: SearchService
  ) {
  }

  ngOnInit() {
    this.form = this.builder.group({
      place: ['']
    });

  }

  ngOnDestroy() {
    this.destroyStream.next();
  }

  search() {
    if (this.form.invalid) {
      this.form.get('place').markAsDirty();
      return;
    }

    const place = this.form.get('place').value;
    this.searchService
      .primitiveSearch(place)
      .pipe(takeUntil(this.destroyStream))
      .subscribe( ({response, request}: INestoriaAnswer) => {
        this.optimizeNestoriaAnswer(response, request);
        this.navigate('/locations');
      });
  }

  optimizeNestoriaAnswer(response, request) {
    const customRequest: IRequest = {
      country: request.country,
      language: request.language,
      listing_type: request.listing_type,
      location: request.location,
      num_res: request.num_res,
      offset: request.offset,
      page: request.page,
      pretty: request.pretty
    };

    const customResponse: IResponse = {
      application_response_code: response.application_response_code,
      listings: response.listings,
      locations: response.locations,
      page: response.page,
      total_pages: response.total_pages,
      total_results: response.total_results
    };

    localStorage.setItem('response', JSON.stringify(customResponse));
    localStorage.setItem('request', JSON.stringify(customRequest));
  }

  searchMyLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        this.requestForSearchMyLocation.bind(this),
        this.handleLocationError,
        {timeout: 5000}
        );
    }
  }

  requestForSearchMyLocation(position) {
    this.searchService
      .myLocationSearch(position.coords.latitude, position.coords.longitude)
      .subscribe(({response, request}: INestoriaAnswer) => {
        this.optimizeNestoriaAnswer(response, request);
        this.navigate('/locations');
      });
  }

  handleLocationError(error) {
    switch (error.code) {
      case 3:
        this.error = 'Unable to detect current location. Please ensure location is turned on in your phone settings and try again.';
        break;
      case 2: case 1:
        this.error = 'The use of location is currently disabled.';
    }
  }

  navigate(route: string) {
    this.router.navigate([route]);
  }
}

