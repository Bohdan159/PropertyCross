import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {INestoriaAnswer} from '../shared/Interfaces/INestoriaAnswer';
import {queryConst} from '../shared/constants/queryConst';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  constructor(private http: HttpClient) { }

  placeNameSearch(place_name: string, page: number = 1): Observable<INestoriaAnswer> {
    return this.http.jsonp<INestoriaAnswer>(
      queryConst.BASE_URL +
      `country=${queryConst.COUNTRY}&` +
      `pretty=${queryConst.PRETTY}&` +
      `action=${queryConst.ACTION}&` +
      `encoding=${queryConst.ENCODING}&` +
      `listing_type=${queryConst.LISTING_TYPE}&` +
      `page=${page}&` +
      `place_name=${place_name}&` +
      `callback=${queryConst.CALLBACK}`,
      'callback');
  }

  centrePointSearch(lat: number = 51.511712, lng: number = -3.431481, page: number = 1): Observable<INestoriaAnswer> {
    return this.http.jsonp<INestoriaAnswer>(
      queryConst.BASE_URL +
      `country=${queryConst.COUNTRY}&` +
      `pretty=${queryConst.PRETTY}&` +
      `action=${queryConst.ACTION}&` +
      `encoding=${queryConst.ENCODING}&` +
      `listing_type=${queryConst.LISTING_TYPE}&` +
      `page=${page}&` +
      `centre_point=${lat},${lng}&` +
      `callback=${queryConst.CALLBACK}`,
      'callback');
  }
}
