import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {INestoriaAnswer} from '../Interfaces/INestoriaAnswer';
// {
//   // providedIn: 'root'
// }

@Injectable()
export class SearchService {

  searchUrl: string;

  constructor(
    private http: HttpClient
  ) { }

  primitiveSearch(place: string): Observable<INestoriaAnswer> {
    return this.http.jsonp<INestoriaAnswer>(
      'http://api.nestoria.de/api?' +
      'country=de&' +
      'pretty=1&' +
      'action=search_listings&' +
      'encoding=json&' +
      'listing_type=buy&' +
      'page=1&' +
      'place_name=berlin',
      'callback');
  }

  myLocationSearch(lat: number, lng: number): Observable<INestoriaAnswer> {
    return this.http.jsonp<INestoriaAnswer>(
      `http://api.nestoria.co.uk/api?` +
      'country=uk&' +
      'pretty=1&' +
      'action=search_listings&' +
      'encoding=json&' +
      'listing_type=buy&' +
      'page=1&' +
      `centre_point=${lat},${lng}`,
      'callback');
  }
}
