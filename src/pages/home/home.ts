import { Component } from '@angular/core';
import { NavController, ViewController, ModalController } from 'ionic-angular';
import { AddListPage } from '../add-list/add-list';
import { ListPage } from '../list/list';
import { MovieInfoPage } from '../movie-info/movie-info';
import { Movies } from '../../providers/movies';

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {
	view: string = 'all';

	constructor(public navCtrl: NavController, public modalCtrl: ModalController, public viewCtrl: ViewController, public movies: Movies) {

	}
	
	addList(): void {
		let modal = this.modalCtrl.create(AddListPage);
		modal.present();
	}

	viewList(list: any): void {
		this.navCtrl.push(ListPage, {
			list: list
		});
	}

	movieInfo(movie: any): void {
		this.navCtrl.push(MovieInfoPage, {
			movie: movie
		});
	}
}
