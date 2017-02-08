import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

import { MoviePage } from '../movie/movie';

import { Movies } from '../../providers/movies';

@Component({
	selector: 'page-search',
	templateUrl: 'search.html'
})
export class SearchPage {
	results: any[] = [
		{
			Title: 'Movie 1',
			Year: "2017",
			imdbID: 1
		},
		{
			Title: 'Movie 2',
			Year: "2017",
			imdbID: 2
		},
		{
			Title: 'Movie 3',
			Year: "2017",
			imdbID: 3
		},
		{
			Title: 'Movie 4',
			Year: "2017",
			imdbID: 4
		},
		{
			Title: 'Movie 5',
			Year: "2017",
			imdbID: 5
		}
	];

	constructor(
		public navCtrl: NavController,
		public alertCtrl: AlertController,
		public movies: Movies
	) {

	}

	searchMovies(event): void {
		/*if (event.target.value && event.target.value.trim() != '') {
			this.movies.search(event.target.value.trim()).subscribe((results) => {
				if (results.Response == 'False') {
					return;
				}
				this.results = results.Search;
			}, (error) => {
				console.log(error);
			});
		} else {
			this.results = [];
		}*/
	}

	viewMovie(movie: any): void {
		this.navCtrl.push(MoviePage, {
			movie: movie
		});
	}
}
