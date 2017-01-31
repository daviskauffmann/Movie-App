import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MovieInfoPage } from '../movie-info/movie-info';
import { Movies } from '../../providers/movies';

@Component({
	selector: 'page-list',
	templateUrl: 'list.html'
})
export class ListPage {
	list: any;

	constructor(public navCtrl: NavController, public navParams: NavParams, public movies: Movies) {
		this.list = navParams.data.list;
		console.log(this.list);
	}

	movieInfo(movie: any): void {
		this.navCtrl.push(MovieInfoPage, {
			movie: movie
		});
	}
}
