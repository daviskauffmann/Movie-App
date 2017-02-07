import { Component } from '@angular/core';
import { ItemSliding, NavController, ModalController, AlertController } from 'ionic-angular';

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
		this.alertCtrl.create({
			title: 'Add List',
			inputs: [
				{
					name: 'name',
					placeholder: 'Name'
				},
				{
					name: 'description',
					placeholder: 'Description'
				}
			],
			buttons: [
				{
					text: 'Cancel'
				},
				{
					text: 'Add',
					handler: (data) => {
						let lists = this.lists.get();
						for (let i = 0; i < lists.length; i++) {
							if (lists[i].name == data.name) {
								this.alertCtrl.create({
									subTitle: 'There is already a list with the same name',
									buttons: ['Ok']
								}).present();
								return false;
							}
						}
						this.lists.add({
							name: data.name,
							description: data.description,
							movies: []
						});
					}
				}
			]
		}).present();
	}

	viewList(list: any): void {
		this.navCtrl.push(ListPage, {
			list: list
		});
	}

	removeList(list: any, itemSliding: ItemSliding): void {
		this.alertCtrl.create({
			subTitle: 'Remove list?',
			buttons: [
				{
					text: 'Cancel',
					handler: () => {
						itemSliding.close();
					}
				},
				{
					text: 'Ok',
					handler: () => {
						setTimeout(() => {
							this.lists.remove(list);
						}, 500);
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
