import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { NavController, ModalController, AlertController, LoadingController } from 'ionic-angular';
import { Movies } from '../../providers/movies';

@Component({
	selector: 'page-search',
	templateUrl: 'search.html'
})
export class SearchPage {
	query: string = '';
	results: any[] = [];

	constructor(public navCtrl: NavController, public alertCtrl: AlertController, public modalCtrl: ModalController, public http: Http, public loadingCtrl: LoadingController, public movies: Movies) {

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
			for (let i = 0; i < this.movies.movies.length; i++) {
				if (this.movies.movies[i].Title == movie.Title) {
					let alert = this.alertCtrl.create({
						title: 'Movie already listed!',
						buttons: ['Ok']
					});
					alert.present();
					return;
				}
			}
			movie.ListNames = [];
			console.log(movie);
			this.movies.addMovie(movie);
			/*let modal = this.modalCtrl.create(ListsPage, {
				selecting: true,
				selections: []
			});
			modal.onDidDismiss((data) => {
				movie.ListNames = data;
				console.log(movie);
				this.movies.addMovie(movie);
			});
			modal.present();*/
		},
			(error) => {
				loader.dismiss();
				console.log(error);
			},
			() => {
				loader.dismiss();
			});
	}
}
