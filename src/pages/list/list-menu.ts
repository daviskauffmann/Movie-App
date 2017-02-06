import { Component } from '@angular/core';
import { NavController, ViewController, ModalController, AlertController } from 'ionic-angular';

import { MoviesPage } from '../movies/movies';
import { AddListPage } from '../add-list/add-list';

import { Lists } from '../../providers/lists';

@Component({
	selector: 'page-list-menu',
	templateUrl: 'list-menu.html'
})
export class ListMenuPage {
	list: any;
	navCtrl: NavController;

  constructor(
		public viewCtrl: ViewController,
		public modalCtrl: ModalController,
		public alertCtrl: AlertController,
		public lists: Lists
	) {
		this.list = viewCtrl.data.list;
		this.navCtrl = viewCtrl.data.navCtrl;
	}

	editList(): void {
		this.modalCtrl.create(AddListPage, {
			list: this.list
		}).present();
		this.viewCtrl.dismiss();
	}

	deleteList(): void {
		this.alertCtrl.create({
			title: 'Remove List',
			message: 'Would you like to remove this list?',
			buttons: [
				{
					text: 'Cancel',
					handler: () => {
						this.viewCtrl.dismiss();
					}
				},
				{
					text: 'Remove',
					handler: () => {
						this.lists.remove(this.list);
						this.navCtrl.pop();
						this.viewCtrl.dismiss();
					}
				}
			]
		}).present();
	}
}
