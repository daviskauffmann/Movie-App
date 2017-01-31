import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { AddListPage } from '../add-list/add-list';
import { ListPage } from '../list/list';
import { MovieInfoPage } from '../movie-info/movie-info';
import { Movies } from '../../providers/movies';

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {
	segment: string = 'all';

	constructor(public navCtrl: NavController, public modalCtrl: ModalController, public movies: Movies) {

	}
	
	addList(): void {
		this.modalCtrl.create(AddListPage).present();
	}

	viewList(list: any): void {
		this.navCtrl.push(ListPage, {
			list: list
		});
	}

	viewMovie(movie: any): void {
		this.navCtrl.push(MovieInfoPage, {
			movie: movie
		});
	}
}
