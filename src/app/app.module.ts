import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Ionic2RatingModule } from 'ionic2-rating';

import { MyApp } from './app.component';

import { TutorialPage } from '../pages/tutorial/tutorial';
import { TabsPage } from '../pages/tabs/tabs';
import { SearchPage } from '../pages/search/search';
import { MoviesPage } from '../pages/movies/movies';
import { ReviewsPage } from '../pages/reviews/reviews';
import { Top10Page } from '../pages/top-10/top-10';
import { MoviePage } from '../pages/movie/movie';
import { ListPage } from '../pages/list/list';
import { SelectListPage } from '../pages/select-list/select-list';
import { AddReviewPage } from '../pages/add-review/add-review';

import { Api } from '../providers/api';
import { Lists } from '../providers/lists';
import { Reviews } from '../providers/reviews';
import { Top10 } from '../providers/top-10';

@NgModule({
	declarations: [
		MyApp,
		TutorialPage,
		TabsPage,
		SearchPage,
		MoviesPage,
		ReviewsPage,
		Top10Page,
		MoviePage,
		ListPage,
		SelectListPage,
		AddReviewPage
	],
	imports: [
		IonicModule.forRoot(MyApp),
		Ionic2RatingModule
	],
	bootstrap: [
		IonicApp
	],
	entryComponents: [
		MyApp,
		TutorialPage,
		TabsPage,
		SearchPage,
		MoviesPage,
		ReviewsPage,
		Top10Page,
		MoviePage,
		ListPage,
		SelectListPage,
		AddReviewPage
	],
	providers: [
		{ 
			provide: ErrorHandler,
			useClass: IonicErrorHandler 
		},
		Storage,
		Api,
		Lists,
		Reviews,
		Top10
	]
})
export class AppModule { }
