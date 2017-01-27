import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Storage } from '@ionic/storage';
import { Movies } from '../providers/movies';
import { TabsPage } from '../pages/tabs/tabs';
import { ToWatchPage } from '../pages/to-watch/to-watch';
import { AddMoviePage } from '../pages/add-movie/add-movie';
import { MovieInfoPage } from '../pages/movie-info/movie-info';
import { RateMoviePage } from '../pages/rate-movie/rate-movie';
import { WatchedPage } from '../pages/watched/watched';
import { AboutPage } from '../pages/about/about';

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    ToWatchPage,
    AddMoviePage,
    MovieInfoPage,
		RateMoviePage,
    WatchedPage,
    AboutPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    ToWatchPage,
    AddMoviePage,
    MovieInfoPage,
		RateMoviePage,
    WatchedPage,
    AboutPage
  ],
  providers: [{ provide: ErrorHandler, useClass: IonicErrorHandler }, Storage, Movies]
})
export class AppModule { }
