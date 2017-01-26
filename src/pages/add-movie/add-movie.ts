import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { NavController, ModalController, AlertController, LoadingController } from 'ionic-angular';
import { CreateMoviePage } from '../create-movie/create-movie';
import { Movies } from '../../providers/movies';

@Component({
	selector: 'page-add-movie',
	templateUrl: 'add-movie.html'
})
export class AddMoviePage {
	query: string = '';
	results: any[] = [];

	constructor(public navCtrl: NavController, public modalCtrl: ModalController, public alertCtrl: AlertController, public http: Http, public loadingCtrl: LoadingController, public movies: Movies) {
		
	}

	createMovie(): void {
		let modal = this.modalCtrl.create(CreateMoviePage, {
			title: this.query
		});
		modal.onDidDismiss((movie) => {
			if (movie) {
				this.movies.addToWatch(movie);
				this.navCtrl.pop();
			}
		});
		modal.present();
	}

	searchMovies(): void {
		if (this.query) {
			let response = this.http.get('http://www.omdbapi.com/?s=' + this.query + '&type=movie&r=json');
			response.subscribe((value) => {
				this.results = value.json().Search;
				console.log(this.results);
			}, (error) => {
				console.log(error);
			}, () => {

			});
		}
	}

	addMovie(result: any): void {
		let loader = this.loadingCtrl.create({
			content: 'Adding...',
		});
		loader.present();
		let response = this.http.get('http://www.omdbapi.com/?t=' + result.Title + '&plot=short&r=json');
		response.subscribe((value) => {
			let movie = value.json();
			if (movie.Response == 'False') {
				let alert = this.alertCtrl.create({
					title: movie.Error,
					buttons: ['Ok']
				});
				alert.present();
				return;
			}
			let listed = false;
			for (let i = 0; i < this.movies.toWatch.length; i++) {
				if (this.movies.toWatch[i].Title == movie.Title) {
					listed = true;
				}
			}
			for (let i = 0; i < this.movies.watched.length; i++) {
				if (this.movies.watched[i].Title == movie.Title) {
					listed = true;
				}
			}
			if (listed) {
				let alert = this.alertCtrl.create({
						title: 'Movie already listed!',
						buttons: ['Ok']
					});
					alert.present();
					return;
			}
			this.movies.addToWatch(movie);
			this.navCtrl.pop();
		},
			(error) => {
				loader.dismiss();
				console.log(error);
			},
			() => {
				loader.dismiss();
			}
		);
	}
}