import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { EditMoviePage } from '../edit-movie/edit-movie';
import { Movies } from '../../providers/movies';

@Component({
    selector: 'page-movie-info',
    templateUrl: 'movie-info.html'
})
export class MovieInfoPage {
    movie: any;

    constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public movies: Movies) {
        this.movie = navParams.get('movie');
    }

    editMovie(): void {
        let modal = this.modalCtrl.create(EditMoviePage, {
            movie: this.movie,
        });
        modal.present();
    }

    removeMovie(): void {
        this.movies.removeToWatch(this.movie);
        this.navCtrl.pop();
    }
}