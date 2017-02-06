import { Component } from '@angular/core';
import { ItemSliding, NavController, AlertController } from 'ionic-angular';

import { MoviePage } from '../movie/movie';

import { Reviews } from '../../providers/reviews';

@Component({
	selector: 'page-reviews',
	templateUrl: 'reviews.html'
})
export class ReviewsPage {
	constructor(
		public navCtrl: NavController,
		public alertCtrl: AlertController,
		public reviews: Reviews
	) {

	}

	viewMovie(movie: any): void {
		this.navCtrl.push(MoviePage, {
			movie: movie
		});
	}

	removeReview(review: any, itemSliding: ItemSliding): void {
		this.alertCtrl.create({
			title: 'Remove Review',
			message: 'Would you like to remove this review?',
			buttons: [
				{
					text: 'Cancel',
					handler: () => {
						itemSliding.close();
					}
				},
				{
					text: 'Remove',
					handler: () => {
						this.reviews.remove(review);
						itemSliding.close();
					}
				}
			]
		}).present();
	}
}
