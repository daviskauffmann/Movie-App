import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

@Component({
    selector: 'page-movie-info',
    templateUrl: 'movie-info.html'
})
export class MovieInfoPage {
    movies: any[];
    movie: any;

    constructor(public navCtrl: NavController, public navParams: NavParams) {
        this.movies = navParams.get('movies');
        this.movie = navParams.get('movie');
    }

    removeMovie() {
        this.navCtrl.pop();
        this.movies.splice(this.movies.indexOf(this.movie), 1);
    }
}