import {IListing} from './IListing';
import {ILocation} from './ILocation';

export interface IResponse {
  application_response_code: string;
  listings: IListing[];
  locations: ILocation[];
  page: number;
  total_pages: number;
  total_results: number;
}
