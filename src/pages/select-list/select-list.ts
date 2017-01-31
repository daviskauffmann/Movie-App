import { Component } from '@angular/core';
import { ViewController, ModalController } from 'ionic-angular';
import { AddListPage } from '../add-list/add-list';
import { Movies } from '../../providers/movies';

@Component({
	selector: 'page-select-list',
	templateUrl: 'select-list.html'
})
export class SelectListPage {
	lists: string[];

	constructor(public modalCtrl: ModalController, public viewCtrl: ViewController, public movies: Movies) {
		this.lists = viewCtrl.data.lists;
	}

	cancel(): void {
		this.viewCtrl.dismiss();
	}

	done(): void {
		this.viewCtrl.dismiss(this.lists);
	}
	
	addList(): void {
		this.modalCtrl.create(AddListPage).present();
	}

	select(list: any): void {
		if (this.lists.indexOf(list) > -1) {
			this.lists.splice(this.lists.indexOf(list), 1);
		} else {
			this.lists.push(list);
		}
	}
}
