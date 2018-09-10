import {Component, OnInit} from '@angular/core';
import {NavigationStart, Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  text: string;
  favesBtn = 0;
  backBtn = 0;  // 0 - nothing; 1 - main page; 2 - locations page

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        switch (event.url) {
          case '/': {
            this.favesBtn = 1;
            this.backBtn = 0;
            this.text = 'PropertyCross';
            break;
          }
          case '/locations': {
            this.backBtn = 1;
            this.favesBtn = 0;
            this.text = '';
            break;
          }
          case '/favourites': {
            this.favesBtn = 0;
            this.backBtn = 1;
            this.text = 'Favourites';
            break;
          }
          default: {
            this.favesBtn = 1;
            this.backBtn = 2;
            this.text = 'PropertyCross';
          }
        }
      }
    });
  }
}
