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
	}

	cancel(): void {
		this.viewCtrl.dismiss();
	}

	add(): void {
		let reviews = this.reviews.get();
		for (let i = 0; i < reviews.length; i++) {
			if (reviews[i].movie.imdbID == this.movie.imdbID) {
				this.alertCtrl.create({
					title: 'You have already reviewed this movie',
					buttons: ['Ok']
				}).present();
				return;
			}
		}
		this.reviews.add({
			movie: this.movie,
			rating: this.rating,
			review: this.review
		})
		this.viewCtrl.dismiss();
	}
}