import { Component, ViewChild } from '@angular/core';
import { NavController, AlertController, Content, InfiniteScroll } from 'ionic-angular';

import { MoviePage } from '../movie/movie';

import { Movies } from '../../providers/movies';

@Component({
	selector: 'page-search',
	templateUrl: 'search.html'
})
export class SearchPage {
	@ViewChild(Content) content: Content;

	query: string = '';
	page: number = 1;
	results: any[] = [];

	constructor(
		public navCtrl: NavController,
		public alertCtrl: AlertController,
		public movies: Movies
	) {

	}

	searchMovies(event): void {
		this.content.scrollToTop();
		this.query = event.target.value.trim();
		this.page = 1;
		this.results = [];
		if (this.query) {
			this.movies.search(this.query, this.page).subscribe((results) => {
				if (results.Response == 'False') {
					return;
				}
				this.page++;
				this.results = results.Search;
			}, (error) => {
				console.log(error);
			});
		}
	}

	infiniteScroll(infiniteScroll: InfiniteScroll): void {
		this.movies.search(this.query, this.page).subscribe((results) => {
			if (results.Response == 'False') {
				return;
			}
			this.page++;
			this.results = this.results.concat(results.Search);
		}, (error) => {
			console.log(error);
			infiniteScroll.complete();
		}, () => {
			infiniteScroll.complete();
		});
	}

	viewMovie(movie: any): void {
		this.navCtrl.push(MoviePage, {
			movie: movie
		});
	}
}
