import { Component } from '@angular/core';
import { ItemSliding, ViewController, ModalController, AlertController } from 'ionic-angular';

import { AddListPage } from '../add-list/add-list';

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
		this.modalCtrl.create(AddListPage).present();
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

	select(list: any): void {
		if (this.selections.indexOf(list) > -1) {
			this.selections.splice(this.selections.indexOf(list), 1);
		} else {
			this.selections.push(list);
		}
	}
}
