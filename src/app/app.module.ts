import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AppComponent} from './app.component';
import {SearchComponent} from './search/search.component';
import {SearchModule} from './search/search.module';
import {LocationDetailModule} from './location/location-detail/location-detail.module';
import {LocationModule} from './location/location.module';
import {HeaderModule} from './header/header.module';
import {HttpClientJsonpModule, HttpClientModule} from '@angular/common/http';
import {LocationComponent} from './location/location.component';
import {LocationDetailComponent} from './location/location-detail/location-detail.component';
import {FavouriteComponent} from './favourite/favourite.component';
import {FavouriteModule} from './favourite/favourite.module';
import {SharedModule} from './shared/shared.module';

const appRoutes: Routes = [
  { path: 'locations', component: LocationComponent, pathMatch: 'full'},
  { path: 'favourites', component: FavouriteComponent, pathMatch: 'full'},
  {path: 'locations/detail/:id', component: LocationDetailComponent, pathMatch: 'full'},
  { path: '**', component: SearchComponent, pathMatch: 'full', redirectTo: '' }
];

@NgModule({
  imports: [
    BrowserModule,
    SharedModule,
    SearchModule,
    HeaderModule,
    LocationModule,
    LocationDetailModule,
    FavouriteModule,
    HttpClientModule,
    HttpClientJsonpModule,
    RouterModule.forRoot(appRoutes)
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
