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

  constructor(private router: Router) { }

  ngOnInit() {
    this.listingArray = JSON.parse(localStorage.getItem('response')).listings;
  }

  showDetails(index) {
    this.router.navigate(['/locations/detail', index]);
  }
}
