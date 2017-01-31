import { Component } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { NavController, AlertController, LoadingController } from 'ionic-angular';
import { MovieInfoPage } from '../movie-info/movie-info';
import { Movies } from '../../providers/movies';

@Component({
	selector: 'page-search',
	templateUrl: 'search.html'
})
export class SearchPage {
	query: string = '';
	results: any[] = [];

	constructor(public navCtrl: NavController, public alertCtrl: AlertController, public http: Http, public loadingCtrl: LoadingController, public movies: Movies) {

	}

	searchMovies(infiniteScroll): void {
		if (this.query && this.query.trim() != '') {
			if (infiniteScroll) {
				let page = Math.floor(this.results.length / 10) + 1;
				console.log(page);
				this.http.get('http://www.omdbapi.com/?s=' + this.query.trim() + '&type=movie&r=json&page=' + page).map((value, index) => {
					return value.json();
				}).subscribe((value) => {
					console.log(value);
					if (value.Response == 'False') {
						return;
					}
					for (let i = 0; i < value.Search.length; i++) {
						this.results.push(value.Search[i]);
					}
				}, (error) => {
					console.log(error);
					infiniteScroll.complete();
				}, () => {
					infiniteScroll.complete();
				});
			} else {
				this.http.get('http://www.omdbapi.com/?s=' + this.query.trim() + '&type=movie&r=json&page=1').map((value, index) => {
					return value.json();
				}).subscribe((value) => {
					console.log(value);
					if (value.Response == 'False') {
						return;
					}
					this.results = value.Search;
				}, (error) => {
					console.log(error);
				});
			}
		}
	}

	viewMovie(result: any): void {
		for (let i = 0; i < this.movies.getMovies().length; i++) {
			if (this.movies.getMovies()[i].imdbID == result.imdbID) {
				this.navCtrl.push(MovieInfoPage, {
					movie: this.movies.getMovies()[i]
				});
				return;
			}
		}
		let loader = this.loadingCtrl.create({
			content: 'Loading...',
		});
		loader.present();
		this.http.get('http://www.omdbapi.com/?i=' + result.imdbID + '&plot=short&r=json').map((value, index) => {
			return value.json();
		}).subscribe((value) => {
			console.log(value);
			if (value.Response == 'False') {
				let alert = this.alertCtrl.create({
					title: value.Error,
					buttons: ['Ok']
				});
				alert.present();
				return;
			}
			value.listNames = [
				'To Watch'
			];
			value.userRating = 0;
			value.userReview = '';
			value.top10Rank = -1;
			this.movies.addMovie(value);
			this.navCtrl.push(MovieInfoPage, {
				movie: value
			});
		}, (error) => {
			loader.dismiss();
			console.log(error);
		}, () => {
			loader.dismiss();
		});
	}
}
