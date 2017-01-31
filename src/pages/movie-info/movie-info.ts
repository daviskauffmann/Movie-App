import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { SelectListPage } from '../select-list/select-list';
import { Movies } from '../../providers/movies';

@Component({
	selector: 'page-movie-info',
	templateUrl: 'movie-info.html'
})
export class MovieInfoPage {
	movie: any;

	constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public movies: Movies) {
		this.movie = this.navParams.data.movie;
		console.log(this.movie);
	}

	selectList(): void {
		let lists: any[] = [];
		for (let i = 0; i < this.movies.getLists().length; i++) {
			if (this.movie.listNames.indexOf(this.movies.getLists()[i].name) > -1) {
				lists.push(this.movies.getLists()[i]);
			}
		}
		let modal = this.modalCtrl.create(SelectListPage, {
			lists: lists
		});
		modal.onDidDismiss((lists) => {
			if (lists) {
				this.movie.listNames = [];
				for (let i = 0; i < lists.length; i++) {
					this.movie.listNames.push(lists[i].name);
				}
				this.movies.save();
			}
		});
		modal.present();
	}
}
