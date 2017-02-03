import { Component } from '@angular/core';
import { ViewController, AlertController } from 'ionic-angular';

import { Reviews } from '../../providers/reviews';

@Component({
	selector: 'page-add-review',
	templateUrl: 'add-review.html'
})
export class AddReviewPage {
	movie: any;
	rating: string = '';
	review: string = '';

	constructor(public viewCtrl: ViewController,
	public alertCtrl: AlertController,
	public reviews: Reviews) {
		this.movie = viewCtrl.data.movie;
		if (viewCtrl.data.review) {
			this.rating = viewCtrl.data.review.rating;
			this.review = viewCtrl.data.review.review
		}
	}

	cancel(): void {
		this.viewCtrl.dismiss();
	}

	add(): void {
		this.reviews.get().forEach((review) => {
			if (review.movie.imdbID == this.movie.imdbID) {
				this.reviews.remove(review);
			}
		});
		this.reviews.add({
			movie: this.movie,
			rating: this.rating,
			review: this.review
		});
		this.viewCtrl.dismiss();
	}
}
