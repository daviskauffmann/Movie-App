import { Component } from '@angular/core';
import { NavController, ViewController, ModalController, AlertController } from 'ionic-angular';

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

	edit(): void {
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
					text: 'Cancel',
					handler: () => {
						this.viewCtrl.dismiss();
					}
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
						this.viewCtrl.dismiss();
					}
				}
			]
		}).present();
	}

	remove(): void {
		this.alertCtrl.create({
			subTitle: 'Remove list?',
			buttons: [
				{
					text: 'Cancel',
					handler: () => {
						this.viewCtrl.dismiss();
					}
				},
				{
					text: 'Ok',
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
