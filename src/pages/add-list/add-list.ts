import { Component } from '@angular/core';
import { ViewController, AlertController } from 'ionic-angular';
import { Movies } from '../../providers/movies';

@Component({
	selector: 'page-add-list',
	templateUrl: 'add-list.html'
})
export class AddListPage {
	name: string = '';
	description: string = '';

	constructor(public viewCtrl: ViewController, public alertCtrl: AlertController, public movies: Movies) {

	}

	cancel(): void {
		this.viewCtrl.dismiss();
	}

	add(): void {
		for (let i = 0; i < this.movies.getLists().length; i++) {
			if (this.movies.getLists()[i].name == this.name) {
				this.alertCtrl.create({
					title: 'There is already a list with the same name',
					buttons: ['Ok']
				}).present();
				return;
			}
		}
		this.movies.addList({
			name: this.name,
			description: this.description
		});
		this.viewCtrl.dismiss();
	}
}