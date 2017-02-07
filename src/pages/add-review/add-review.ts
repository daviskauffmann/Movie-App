import { Component } from '@angular/core';
import { ViewController, AlertController } from 'ionic-angular';

import { Reviews } from '../../providers/reviews';

@Component({
	selector: 'page-add-review',
	templateUrl: 'add-review.html'
})
export class AddReviewPage {
	movie: any;
	rating: number = 5;
	review: string = '';

	constructor(
		public viewCtrl: ViewController,
		public alertCtrl: AlertController,
		public reviews: Reviews
	) {
		this.movie = viewCtrl.data.movie;
		if (viewCtrl.data.review) {
			this.rating = viewCtrl.data.review.rating;
			this.review = viewCtrl.data.review.review;
		}
	}

	cancel(): void {
		this.viewCtrl.dismiss();
	}

	add(): void {
		this.reviews.add({
			movie: this.movie,
			rating: this.rating,
			review: this.review,
			date: new Date()
		});
		this.viewCtrl.dismiss();
	}

	edit(): void {
		this.viewCtrl.data.review.rating = this.rating;
		this.viewCtrl.data.review.review = this.review;
		this.reviews.save();
		this.viewCtrl.dismiss();
	}
}
