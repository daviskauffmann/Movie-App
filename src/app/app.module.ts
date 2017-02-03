import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { MyApp } from './app.component';

import { TabsPage } from '../pages/tabs/tabs';
import { SearchPage } from '../pages/search/search';
import { MoviesPage } from '../pages/movies/movies';
import { ReviewsPage } from '../pages/reviews/reviews';
import { Top10Page } from '../pages/top-10/top-10';
import { MoviePage } from '../pages/movie/movie';
import { ListPage } from '../pages/list/list';
import { AddListPage } from '../pages/add-list/add-list';
import { SelectListPage } from '../pages/select-list/select-list';
import { AddReviewPage } from '../pages/add-review/add-review';

import { Movies } from '../providers/movies';
import { Lists } from '../providers/lists';
import { Reviews } from '../providers/reviews';

@NgModule({
	declarations: [
		MyApp,
		TabsPage,
		SearchPage,
		MoviesPage,
		ReviewsPage,
		Top10Page,
		MoviePage,
		ListPage,
		AddListPage,
		SelectListPage,
		AddReviewPage
	],
	imports: [
		IonicModule.forRoot(MyApp)
	],
	bootstrap: [
		IonicApp
	],
	entryComponents: [
		MyApp,
		TabsPage,
		SearchPage,
		MoviesPage,
		ReviewsPage,
		Top10Page,
		MoviePage,
		ListPage,
		AddListPage,
		SelectListPage,
		AddReviewPage
	],
	providers: [
		{ 
			provide: ErrorHandler,
			useClass: IonicErrorHandler 
		},
		Storage,
		Movies,
		Lists,
		Reviews
	]
})
export class AppModule { }
