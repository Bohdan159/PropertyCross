import {Component, OnInit} from '@angular/core';
import {LocalStorageService} from './services/localStorage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private localStorageService: LocalStorageService) {}

  ngOnInit() {
    this.localStorageService.removeItem('Response');
    this.localStorageService.removeItem('Request');
  }
}
