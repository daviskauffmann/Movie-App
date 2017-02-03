import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { MoviePage } from '../movie/movie';

import { Lists } from '../../providers/lists';

@Component({
	selector: 'page-list',
	templateUrl: 'list.html'
})
export class ListPage {
	list: any;

	constructor(public navCtrl: NavController,
	public navParams: NavParams,
	public lists: Lists) {
		this.list = navParams.data.list;
	}

	viewMovie(movie: any): void {
		this.navCtrl.push(MoviePage, {
			movie: movie
		});
	}

	removeMovie(movie: any): void {
		this.list.movies.splice(this.list.movies.indexOf(movie), 1);
		this.lists.save();
	}
}
