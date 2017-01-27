import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { Movies } from '../../providers/movies';

@Component({
  selector: 'page-movie-info',
  templateUrl: 'movie-info.html'
})
export class MovieInfoPage {
  movie: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public movies: Movies) {
    this.movie = this.navParams.get('movie');
		console.log(this.movie);
  }
  removeMovie(): void {
    this.movies.removeToWatch(this.movie);
    this.navCtrl.pop();
  }
}
