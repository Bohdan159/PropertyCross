import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AppComponent} from './app.component';
import {SearchComponent} from './search/search.component';
import {FavoriteModule} from './favorite/favorite.module';
import {ButtonModule} from './shared/button/button.module';
import {SearchModule} from './search/search.module';
import {LocationDetailModule} from './location/location-detail/location-detail.module';
import {FooterModule} from './footer/footer.module';
import {LocationModule} from './location/location.module';
import {HeaderModule} from './header/header.module';
import {SearchService} from './shared/services/search.service';
import {HttpClientJsonpModule, HttpClientModule} from '@angular/common/http';
import {LocationComponent} from './location/location.component';
import {LocationDetailComponent} from './location/location-detail/location-detail.component';
import {FavoriteComponent} from './favorite/favorite.component';
import {FavoritesService} from './shared/services/favorites.service';

const appRoutes: Routes = [
  { path: 'locations', component: LocationComponent, pathMatch: 'full'},
  { path: 'favorites', component: FavoriteComponent, pathMatch: 'full'},
  {path: 'locations/detail/:id', component: LocationDetailComponent, pathMatch: 'full'},
  { path: '**', component: SearchComponent, pathMatch: 'full', redirectTo: '' }
];

@NgModule({
  imports: [
    BrowserModule,
    ButtonModule,
    SearchModule,
    HeaderModule,
    FooterModule,
    LocationModule,
    LocationDetailModule,
    FavoriteModule,
    HttpClientModule,
    HttpClientJsonpModule,
    RouterModule.forRoot(appRoutes)
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  providers: [SearchService, FavoritesService]
})
export class AppModule { }
