import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, ActionSheetController, AlertController } from 'ionic-angular';
import { Movies } from '../../providers/movies';

@Component({
	selector: 'page-movie-info',
	templateUrl: 'movie-info.html'
})
export class MovieInfoPage {
	movie: any;

	constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public actionSheetCtrl: ActionSheetController, public alertCtrl: AlertController, public movies: Movies) {
		this.movie = this.navParams.get('movie');
		console.log(this.movie);
	}

	more(): void {
		let actionSheet = this.actionSheetCtrl.create({
			title: this.movie.Title,
			buttons: [
				{
					text: 'Delete',
					role: 'destructive',
					handler: () => {
						this.movies.removeMovie(this.movie);
						this.navCtrl.pop();
					}
				},
				{
					text: 'Lists',
					handler: () => {
						/*let selections = [];
						for (let i = 0; i < this.movie.ListNames.length; i++) {
							for (let j = 0; j < this.movies.lists.length; j++) {
								if (this.movie.ListNames[i] == this.movies.lists[j].name) {
									selections.push(this.movies.lists[j]);
								}
							}
						}
						let modal = this.modalCtrl.create(ListsPage, {
							selecting: true,
							selections: selections
						});
						modal.onDidDismiss((data) => {
							this.movie.ListNames = data;
							console.log(this.movie);
							this.movies.save();
						});
						modal.present();*/
					}
				},
				{
					text: 'Top 10',
					handler: () => {

					}
				},
				{
					text: 'Cancel',
					role: 'cancel',
					handler: () => {

					}
				}
			]
		});
		actionSheet.present();
	}
}
