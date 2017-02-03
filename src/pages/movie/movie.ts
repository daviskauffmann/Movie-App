import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, AlertController, LoadingController } from 'ionic-angular';

import { SelectListPage } from '../select-list/select-list';
import { AddReviewPage } from '../add-review/add-review';

import { Movies } from '../../providers/movies';
import { Lists } from '../../providers/lists';
import { Reviews } from '../../providers/reviews';

@Component({
	selector: 'page-movie',
	templateUrl: 'movie.html'
})
export class MoviePage {
	movie: any;
	fullMovie: any = {};
	metascore: string = 'unfavorable';

	constructor(public navCtrl: NavController,
	public navParams: NavParams,
	public modalCtrl: ModalController,
	public loadingCtrl: LoadingController,
	public alertCtrl: AlertController,
	public movies: Movies,
	public lists: Lists,
	public reviews: Reviews) {
		this.movie = this.navParams.data.movie;
		let loader = this.loadingCtrl.create({
			content: 'Loading...',
		});
		loader.present();
		this.movies.get(this.movie.imdbID).subscribe((movie) => {
			if (movie.Response == 'False') {
				let alert = this.alertCtrl.create({
					title: movie.Error,
					buttons: ['Ok']
				});
				alert.present();
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
		});
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
}
