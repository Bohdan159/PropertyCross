import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {INestoriaAnswer} from '../Interfaces/INestoriaAnswer';

@Injectable()
export class SearchService {

  constructor(private http: HttpClient) { }

  primitiveSearch(place_name: string): Observable<INestoriaAnswer> {
    return this.http.jsonp<INestoriaAnswer>(
      'http://api.nestoria.co.uk/api?' +
      'country=uk&' +
      'pretty=1&' +
      'action=search_listings&' +
      'encoding=json&' +
      'listing_type=buy&' +
      'page=1&' +
      `place_name=${place_name}`,
      'callback');
  }

  myLocationSearch(lat: number = 51.511712, lng: number = -0.127712): Observable<INestoriaAnswer> {
    return this.http.jsonp<INestoriaAnswer>(
      `http://api.nestoria.co.uk/api?` +
      'country=uk&' +
      'pretty=1&' +
      'action=search_listings&' +
      'encoding=json&' +
      'listing_type=buy&' +
      'page=1&' +
      `centre_point=${lat}, ${lng}`,
      'callback');
  }
}
