import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, LoadingController, AlertController, ToastController } from 'ionic-angular';

import { SelectListPage } from '../select-list/select-list';
import { AddReviewPage } from '../add-review/add-review';

import { Movies } from '../../providers/movies';
import { Lists } from '../../providers/lists';
import { Reviews } from '../../providers/reviews';
import { Top10 } from '../../providers/top-10';

@Component({
	selector: 'page-movie',
	templateUrl: 'movie.html'
})
export class MoviePage {
	movie: any;
	fullMovie: any = {};
	metascore: string = 'unfavorable';

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public modalCtrl: ModalController,
		public loadingCtrl: LoadingController,
		public alertCtrl: AlertController,
		public toastCtrl: ToastController,
		public movies: Movies,
		public lists: Lists,
		public reviews: Reviews,
		public top10: Top10
	) {
		this.movie = this.navParams.data.movie;
		/*let loader = this.loadingCtrl.create({
			content: 'Loading...',
		});
		loader.present();
		this.movies.get(this.movie.imdbID).subscribe((movie) => {
			if (movie.Response == 'False') {
				this.alertCtrl.create({
					subTitle: movie.Error,
					buttons: ['Ok']
				}).present();
				return;
			}
			this.fullMovie = movie;
			this.metascore = parseInt(this.fullMovie.Metascore) > 60 ? 'favorable'
				: parseInt(this.fullMovie.Metascore) > 39 ? 'mixed'
				: 'unfavorable';
		}, (error) => {
			console.log(error);
			loader.dismiss();
		}, () => {
			loader.dismiss();
		});*/
	}

	selectList(): void {
		let modal = this.modalCtrl.create(SelectListPage, {
			selections: this.lists.get().filter((list) => {
				return list.movies.some((movie) => {
					return movie.imdbID == this.movie.imdbID;
				});
			})
		});
		modal.onDidDismiss((selections) => {
			if (selections) {
				this.lists.get().forEach((list) => {
					list.movies.forEach((movie) => {
						if (movie.imdbID == this.movie.imdbID) {
							this.lists.removeMovie(list, movie);
						}
					});
				});
				selections.forEach((selection) => {
					this.lists.addMovie(selection, this.movie);
				});
			}
		});
		modal.present();
	}

	addReview(): void {
		this.modalCtrl.create(AddReviewPage, {
			movie: this.movie,
			review: this.getReview()
		}).present();
	}

	getReview(): any {
		return this.reviews.get().find((review) => {
			return review.movie.imdbID == this.movie.imdbID;
		});
	}

	getStars(): boolean[] {
		let stars = [];
		let review = this.getReview();
		if (review) {
			for (let i = 0; i < 10; i++) {
				stars.push(i < review.rating);
			}
		}
		return stars;
	}

	addTop10(): void {
		let top10 = this.top10.get();
		for (let i = 0; i < top10.length; i++) {
			if (top10[i].imdbID == this.movie.imdbID) {
				this.alertCtrl.create({
					subTitle: 'This movie is already in your Top 10',
					buttons: ['Ok']
				}).present();
				return;
			}
		}
		if (top10.length == 10) {
			this.alertCtrl.create({
				subTitle: 'This will bump off the current #10 movie',
				buttons: [
					{
						text: 'Cancel'
					},
					{
						text: 'Ok',
						handler: () => {
							this.top10.remove(top10[10]);
							this.top10.add(this.movie);
							this.toastCtrl.create({
								message: this.movie.Title + ' added to Top 10',
								duration: 3000,
								position: 'bottom'
							}).present();
						}
					}
				]
			}).present();
		} else {
			this.top10.add(this.movie);
			this.toastCtrl.create({
				message: this.movie.Title + ' added to Top 10',
				duration: 3000,
				position: 'bottom'
			}).present();
		}
	}
}
