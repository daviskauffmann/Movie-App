import { Component } from '@angular/core';

import { NavController, NavParams, ModalController } from 'ionic-angular';

import { EditMoviePage } from '../edit-movie/edit-movie';

@Component({
    selector: 'page-movie-info',
    templateUrl: 'movie-info.html'
})
export class MovieInfoPage {
    movies: any[];
    movie: any;

    constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {
        this.movies = navParams.get('movies');
        this.movie = navParams.get('movie');
    }

    editMovie(): void {
        let modal = this.modalCtrl.create(EditMoviePage, {
            movie: this.movie,
        });
        modal.present();
    }

    removeMovie(): void {
        this.movies.splice(this.movies.indexOf(this.movie), 1);
        this.navCtrl.pop();
    }
}