import {Component, OnInit} from '@angular/core';
import {IListing} from '../shared/Interfaces/IListing';
import {Router} from '@angular/router';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {
  listingArray: IListing[];
  total_pages: number;
  total_results: number;
  page: number;
  text: string;
  // countListings: number;
  // num_res: number;

  constructor(private router: Router) { }

  ngOnInit() {
    const {listings, page, total_pages, total_results} = JSON.parse(localStorage.getItem('response'));
    this.listingArray = listings;
    this.page = page;
    this.total_pages = total_pages;
    this.total_results = total_results;

    // this.countListings = this.page * 20;
    // this.num_res = 225 - this.countListings;
    // if (this.num_res > 20)

  }

  showDetails(index: number) {
    this.router.navigate(['/locations/detail', index]);
  }

  loadMore() {

  }
}
