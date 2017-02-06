import { Component } from '@angular/core';
import { ItemSliding, NavController, ModalController, AlertController } from 'ionic-angular';

import { AddListPage } from '../add-list/add-list';
import { ListPage } from '../list/list';
import { MoviePage } from '../movie/movie';

import { Lists } from '../../providers/lists';

@Component({
	selector: 'page-movies',
	templateUrl: 'movies.html'
})
export class MoviesPage {
	segment: string = 'all';
	movieFilter: string = '';
	listFilter: string = '';

	constructor(
		public navCtrl: NavController,
		public modalCtrl: ModalController,
		public alertCtrl: AlertController,
		public lists: Lists
	) {

	}

	addList(): void {
		this.modalCtrl.create(AddListPage).present();
	}

	viewList(list: any): void {
		this.navCtrl.push(ListPage, {
			list: list
		});
	}

	removeList(list: any, itemSliding: ItemSliding): void {
		this.alertCtrl.create({
			title: 'Remove List',
			message: 'Would you like to remove this list?',
			buttons: [
				{
					text: 'Cancel',
					handler: () => {
						itemSliding.close();
					}
				},
				{
					text: 'Remove',
					handler: () => {
						this.lists.remove(list);
						itemSliding.close();
					}
				}
			]
		}).present();
	}

	viewMovie(movie: any): void {
		this.navCtrl.push(MoviePage, {
			movie: movie
		});
	}
}
