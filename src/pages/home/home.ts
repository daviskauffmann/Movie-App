import { Component } from '@angular/core';

import { NavController, ModalController } from 'ionic-angular';

import { AddMoviePage } from '../add-movie/add-movie';
import { CreateMoviePage } from '../create-movie/create-movie';
import { MovieInfoPage } from '../movie-info/movie-info';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    // image on list
    // searchbar
    // SQL database
    public movies: any[];

    constructor(public navCtrl: NavController, public modalCtrl: ModalController) {
        this.movies = [];
    }

    addMovieMenu() {
        let modal = this.modalCtrl.create(AddMoviePage, {
            movies: this.movies
        });
        modal.present();
    }

    getGenres() {
        let genres: string[] = [];
        for (let i = 0; i < this.movies.length; i++) {
            if (!this.arrayContains(genres, this.movies[i].Genre)) {
                genres.push(this.movies[i].Genre);
            }
        }
        genres = genres.sort();
        return genres;
    }

    arrayContains(array: any[], element: any) {
        for (let i = 0; i < array.length; i++) {
            if (array[i] == element) {
                return true;
            }
        }
        return false;
    }

    getMovies(genre: string) {
        let movies: any[] = [];
        for (let i = 0; i < this.movies.length; i++) {
            if (this.movies[i].Genre == genre) {
                movies.push(this.movies[i]);
            }
        }
        return movies;
    }

    movieInfoMenu(movie: any) {
        this.navCtrl.push(MovieInfoPage, {
            movies: this.movies,
            movie: movie
        });
    }

    removeMovie(movie: any) {
        this.movies.splice(this.movies.indexOf(movie), 1);
    }
}