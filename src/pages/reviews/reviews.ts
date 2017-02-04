import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { MoviePage } from '../movie/movie';

import { Reviews } from '../../providers/reviews';

@Component({
	selector: 'page-reviews',
	templateUrl: 'reviews.html'
})
export class ReviewsPage {
	constructor(public navCtrl: NavController,
	public reviews: Reviews) {

	}

	viewMovie(movie: any): void {
		this.navCtrl.push(MoviePage, {
			movie: movie
		});
	}
}
