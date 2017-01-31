import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { MyApp } from './app.component';
import { TabsPage } from '../pages/tabs/tabs';
import { SearchPage } from '../pages/search/search';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { SelectListPage } from '../pages/select-list/select-list';
import { AddListPage } from '../pages/add-list/add-list';
import { MovieInfoPage } from '../pages/movie-info/movie-info';
import { Movies } from '../providers/movies';

@NgModule({
  declarations: [
    MyApp,
		TabsPage,
		SearchPage,
		HomePage,
		ListPage,
		SelectListPage,
		AddListPage,
    MovieInfoPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
		TabsPage,
		SearchPage,
		HomePage,
		ListPage,
		SelectListPage,
		AddListPage,
    MovieInfoPage
  ],
  providers: [{ provide: ErrorHandler, useClass: IonicErrorHandler }, Storage, Movies]
})
export class AppModule { }
