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
	review: any;

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
		this.movies.getByID(this.movie.imdbID).subscribe((value) => {
			if (value.Response == 'False') {
				let alert = this.alertCtrl.create({
					title: value.Error,
					buttons: ['Ok']
				});
				alert.present();
				return;
			}
			this.fullMovie = value;
			this.reviews.get().forEach((value) => {
				if (value.movie.imdbID == this.movie.imdbID) {
					this.review = value;
				}
			});
		}, (error) => {
			console.log(error);
			loader.dismiss();
		}, () => {
			loader.dismiss();
		});
	}

	selectList(): void {
		let selections: any[] = this.lists.get().filter((value) => {
			for (let i = 0; i < value.movies.length; i++) {
				if (value.movies[i].imdbID == this.movie.imdbID) {
					return true;
				}
			}
			return false;
		});
		let modal = this.modalCtrl.create(SelectListPage, {
			selections: selections
		});
		modal.onDidDismiss((lists) => {
			if (lists) {
				this.lists.get().forEach((value) => {
					for (let i = 0; i < value.movies.length; i++) {
						if (value.movies[i].imdbID == this.movie.imdbID) {
							value.movies.splice(i, 1);
							break;
						}
					}
				});
				for (let i = 0; i < lists.length; i++) {
					lists[i].movies.push(this.movie);
				}
				this.lists.save();
			}
		});
		modal.present();
	}

	addReview(): void {
		let modal = this.modalCtrl.create(AddReviewPage, {
			movie: this.movie
		});
		modal.present();
	}
}
