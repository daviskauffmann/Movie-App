import { Component, ViewChild } from '@angular/core';
import { NavController, AlertController, Content, Searchbar, InfiniteScroll } from 'ionic-angular';

import { MoviePage } from '../movie/movie';

import { Movies } from '../../providers/movies';

@Component({
	selector: 'page-search',
	templateUrl: 'search.html'
})
export class SearchPage {
	@ViewChild(Content) content: Content;
	@ViewChild(Searchbar) searchBar: Searchbar;
	@ViewChild(InfiniteScroll) infiniteScroll: InfiniteScroll;

	query: string = '';
	page: number = 1;
	lastPage: boolean = false;
	results: any[] = [];

	constructor(
		public navCtrl: NavController,
		public alertCtrl: AlertController,
		public movies: Movies
	) {

	}

	searchMovies(): void {
		this.content.scrollToTop();
		this.infiniteScroll.enable(true);
		this.query = this.searchBar.value.toString();
		this.page = 1;
		this.lastPage = false;
		this.results = [];
		if (this.query) {
			this.movies.search(this.query, this.page).subscribe((response) => {
				if (response.Response == 'False') {
					return;
				}
				this.page++;
				this.results = response.Search;
			}, (error) => {
				console.log(error);
			});
		}
	}

	searchMoreMovies(): void {
		if (this.lastPage) {
			this.infiniteScroll.complete();
			this.infiniteScroll.enable(false);
			return;
		}
		this.movies.search(this.query, this.page).subscribe((response) => {
			if (response.Response == 'False') {
				this.lastPage = true;
				return;
			}
			this.page++;
			this.results = this.results.concat(response.Search);
		}, (error) => {
			console.log(error);
			this.infiniteScroll.complete();
		}, () => {
			this.infiniteScroll.complete();
		});
	}

	viewMovie(movie: any): void {
		this.navCtrl.push(MoviePage, {
			movie: movie
		});
	}
}
