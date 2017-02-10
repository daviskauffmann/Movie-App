import { Component } from '@angular/core';
import { NavController, AlertController, ItemSliding } from 'ionic-angular';

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
			subTitle: 'Remove review?',
			buttons: [
				{
					text: 'Cancel',
					handler: () => {
						itemSliding.close();
					}
				},
				{
					text: 'Ok',
					handler: () => {
						setTimeout(() => {
							this.reviews.remove(review);
						}, 500);
						itemSliding.close();
					}
				}
			]
		}).present();
	}
}
