import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController, AlertController, ItemSliding } from 'ionic-angular';

import { MoviePage } from '../movie/movie';

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
		public actionSheetCtrl: ActionSheetController,
		public alertCtrl: AlertController,
		public lists: Lists
	) {
		this.list = navParams.data.list;
	}

	showMenu(event): void {
		this.actionSheetCtrl.create({
			title: this.list.name,
			buttons: [
				{
					text: 'Remove',
          role: 'destructive',
					handler: () => {
						this.alertCtrl.create({
							subTitle: 'Remove list?',
							buttons: [
								{
									text: 'Cancel'
								},
								{
									text: 'Ok',
									handler: () => {
										this.lists.remove(this.list);
										this.navCtrl.pop();
									}
								}
							]
						}).present();
					}
				},
				{
					text: 'Edit',
					handler: () => {
						this.alertCtrl.create({
							title: 'Edit List',
							inputs: [
								{
									name: 'name',
									placeholder: 'Name',
									value: this.list.name
								},
								{
									name: 'description',
									placeholder: 'Description',
									value: this.list.description
								}
							],
							buttons: [
								{
									text: 'Cancel'
								},
								{
									text: 'Edit',
									handler: (data) => {
										let lists = this.lists.get();
										for (let i = 0; i < lists.length; i++) {
											if (lists[i] != this.list && lists[i].name == data.name) {
												this.alertCtrl.create({
													subTitle: 'There is already a list with the same name',
													buttons: ['Ok']
												}).present();
												return false;
											}
										}
										this.list.name = data.name;
										this.list.description = data.description;
										this.lists.save();
									}
								}
							]
						}).present();
					}
				},
				{
					text: 'Cancel',
					role: 'cancel'
				}
			]
		}).present();
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
