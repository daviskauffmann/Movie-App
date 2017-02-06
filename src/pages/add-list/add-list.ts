import { Component } from '@angular/core';
import { ViewController, AlertController } from 'ionic-angular';

import { Lists } from '../../providers/lists';

@Component({
	selector: 'page-add-list',
	templateUrl: 'add-list.html'
})
export class AddListPage {
	name: string = '';
	description: string = '';

	constructor(
		public viewCtrl: ViewController,
		public alertCtrl: AlertController,
		public lists: Lists
	) {
		if (this.viewCtrl.data.list) {
			this.name = this.viewCtrl.data.list.name;
			this.description = this.viewCtrl.data.list.description;
		}
	}

	cancel(): void {
		this.viewCtrl.dismiss();
	}

	add(): void {
		let lists = this.lists.get();
		for (let i = 0; i < lists.length; i++) {
			if (lists[i].name == this.name) {
				this.alertCtrl.create({
					title: 'There is already a list with the same name',
					buttons: ['Ok']
				}).present();
				return;
			}
		}
		this.lists.add({
			name: this.name,
			description: this.description,
			movies: []
		});
		this.viewCtrl.dismiss();
	}

	edit(): void {
		this.viewCtrl.data.list.name = this.name;
		this.viewCtrl.data.list.description = this.description;
		this.lists.save();
		this.viewCtrl.dismiss();
	}
}
