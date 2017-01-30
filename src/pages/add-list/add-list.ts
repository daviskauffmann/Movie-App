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
		this.movies.lists.push({
			name: this.name,
			description: this.description
		});
		this.viewCtrl.dismiss();
	}
}