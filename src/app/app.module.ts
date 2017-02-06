import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { MyApp } from './app.component';

import { TutorialPage } from '../pages/tutorial/tutorial';
import { TabsPage } from '../pages/tabs/tabs';
import { SearchPage } from '../pages/search/search';
import { MoviesPage } from '../pages/movies/movies';
import { ReviewsPage } from '../pages/reviews/reviews';
import { Top10Page } from '../pages/top-10/top-10';
import { MoviePage } from '../pages/movie/movie';
import { ListPage } from '../pages/list/list';
import { ListMenuPage } from '../pages/list/list-menu';
import { AddListPage } from '../pages/add-list/add-list';
import { SelectListPage } from '../pages/select-list/select-list';
import { AddReviewPage } from '../pages/add-review/add-review';

import { Movies } from '../providers/movies';
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
		ListMenuPage,
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
		TutorialPage,
		TabsPage,
		SearchPage,
		MoviesPage,
		ReviewsPage,
		Top10Page,
		MoviePage,
		ListPage,
		ListMenuPage,
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
		Reviews,
		Top10
	]
})
export class AppModule { }
