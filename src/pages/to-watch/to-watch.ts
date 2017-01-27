import { Component } from '@angular/core';
import { NavController, ModalController, AlertController } from 'ionic-angular';
import { AddMoviePage } from '../add-movie/add-movie';
import { MovieInfoPage } from '../movie-info/movie-info';
import { RateMoviePage } from '../rate-movie/rate-movie';
import { Movies } from '../../providers/movies';

@Component({
  selector: 'page-to-watch',
  templateUrl: 'to-watch.html'
})
export class ToWatchPage {
	genreQuery: string = '';

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public alertCtrl: AlertController, public movies: Movies) {
		this.movies.loadToWatch();
  }

  addMovie() {
    this.navCtrl.push(AddMoviePage);
  }

  getGenres(): string[] {
    let genres: string[] = [];
    for (let i = 0; i < this.movies.toWatch.length; i++) {
			if (genres.indexOf(this.movies.toWatch[i].Genre) < 0) {
				genres.push(this.movies.toWatch[i].Genre);
			}
		}
    if (this.genreQuery && this.genreQuery.trim() != '') {
      genres = genres.filter((value, index, array) => {
        return value.toLowerCase().indexOf(this.genreQuery.toLowerCase()) > -1;
      });
    }
    return genres.sort();
  }

  getMovies(genre: string): any[] {
    let movies = this.movies.toWatch.filter((value, index, array) => {
      return value.Genre == genre;
    });
    return movies.sort();
  }

  movieInfo(movie: any): void {
    this.navCtrl.push(MovieInfoPage, {
      movie: movie
    });
  }

  removeMovie(movie: any): void {
    this.movies.removeToWatch(movie);
  }

  addWatched(movie: any): void {
		let alert = this.alertCtrl.create({
			title: 'Would you like to rate the movie?',
			buttons: [
				{
					text: 'No'
				},
				{
					text: 'Yes',
					handler: () => {
						let modal = this.modalCtrl.create(RateMoviePage, {
							movie: movie
						});
						modal.present();
					}
				}
			]
		});
		alert.onDidDismiss(() => {
			this.movies.removeToWatch(movie);
    	this.movies.addWatched(movie);
		});
		alert.present();
  }
}
