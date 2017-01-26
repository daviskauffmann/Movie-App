import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MovieInfoPage } from '../movie-info/movie-info';
import { Movies } from '../../providers/movies';

@Component({
  selector: 'page-watched',
  templateUrl: 'watched.html'
})
export class WatchedPage {
	genreQuery: string = '';

  constructor(public navCtrl: NavController, public movies: Movies) {
    this.movies.loadWatched();
  }

  getGenres(): string[] {
    let genres: string[] = [];
    for (let i = 0; i < this.movies.watched.length; i++) {
      if (genres.indexOf(this.movies.watched[i].Genre) < 0) {
				genres.push(this.movies.watched[i].Genre);
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
    let movies = this.movies.watched.filter((value, index, array) => {
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
    this.movies.removeWatched(movie);
  }

	addToWatch(movie: any): void {
		this.movies.addToWatch(movie);
		this.movies.removeWatched(movie);
	}
}
