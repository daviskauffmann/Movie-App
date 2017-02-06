import { Component } from '@angular/core';
import { ItemSliding, NavController, AlertController } from 'ionic-angular';

import { MoviePage } from '../movie/movie';

import { Top10 } from '../../providers/top-10';

@Component({
	selector: 'page-top-10',
	templateUrl: 'top-10.html'
})
export class Top10Page {
	reorder: boolean = false;

	constructor(
		public navCtrl: NavController,
		public alertCtrl: AlertController,
		public top10: Top10
	) {

	}

	viewMovie(movie: any): void {
		this.navCtrl.push(MoviePage, {
			movie: movie
		});
	}

	removeMovie(movie: any, itemSliding: ItemSliding): void {
		this.alertCtrl.create({
			title: 'Remove Movie',
			message: 'Would you like to remove this movie?',
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
						this.top10.remove(movie);
						itemSliding.close();
					}
				}
			]
		}).present();
	}
}
