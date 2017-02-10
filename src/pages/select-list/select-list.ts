import { Component } from '@angular/core';
import { ViewController, ModalController, AlertController, ItemSliding } from 'ionic-angular';

import { Lists } from '../../providers/lists';

@Component({
	selector: 'page-select-list',
	templateUrl: 'select-list.html'
})
export class SelectListPage {
	selections: string[];
	filter: string = '';

	constructor(
		public modalCtrl: ModalController,
		public viewCtrl: ViewController,
		public alertCtrl: AlertController,
		public lists: Lists
	) {
		this.selections = viewCtrl.data.selections;
	}

	cancel(): void {
		this.viewCtrl.dismiss();
	}

	done(): void {
		this.viewCtrl.dismiss(this.selections);
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

	select(list: any): void {
		if (this.selections.indexOf(list) > -1) {
			this.selections.splice(this.selections.indexOf(list), 1);
		} else {
			this.selections.push(list);
		}
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
}
