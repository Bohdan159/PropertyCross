import {Component} from '@angular/core';
import {Location} from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private router: Router, private location: Location) {
  }

  navigate(route: string) {
    this.router.navigate([route]);
  }

  checkLocation() {
    return this.location.path();
  }
}

