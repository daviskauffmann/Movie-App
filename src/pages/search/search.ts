import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

import { MoviePage } from '../movie/movie';

import { Movies } from '../../providers/movies';

@Component({
	selector: 'page-search',
	templateUrl: 'search.html'
})
export class SearchPage {
	query: string = '';
	results: any[] = [];

	constructor(public navCtrl: NavController,
	public alertCtrl: AlertController,
	public movies: Movies) {

	}

	searchMovies(): void {
		if (this.query && this.query.trim() != '') {
			this.movies.search(this.query.trim()).subscribe((value) => {
				if (value.Response == 'False') {
					return;
				}
				this.results = value.Search;
			}, (error) => {
				console.log(error);
			});
		}
	}

	viewMovie(movie: any): void {
		this.navCtrl.push(MoviePage, {
			movie: movie
		});
	}
}
