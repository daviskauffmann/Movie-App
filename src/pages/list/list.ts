import { Component } from '@angular/core';
import { ItemSliding, NavController, NavParams, PopoverController } from 'ionic-angular';

import { MoviePage } from '../movie/movie';
import { ListMenuPage } from './list-menu';

import { Lists } from '../../providers/lists';

@Component({
	selector: 'page-list',
	templateUrl: 'list.html'
})
export class ListPage {
	list: any;
	filter: string = '';

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public popoverCtrl: PopoverController,
		public lists: Lists
	) {
		this.list = navParams.data.list;
	}

	showMenu(event): void {
		this.popoverCtrl.create(ListMenuPage, {
			list: this.list,
			navCtrl: this.navCtrl
		}).present({
			ev: event
		});
	}

	viewMovie(movie: any): void {
		this.navCtrl.push(MoviePage, {
			movie: movie
		});
	}

	removeMovie(movie: any, itemSliding: ItemSliding): void {
		setTimeout(() => {
			this.lists.removeMovie(this.list, movie);
		}, 500);
		itemSliding.close();
	}
}
