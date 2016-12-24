import { Component } from '@angular/core';

import { NavController, ModalController } from 'ionic-angular';

import { AddMoviePage } from '../add-movie/add-movie';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    public movies: movie[];

    constructor(public navCtrl: NavController, public modalCtrl: ModalController) {
        this.movies = [
            {
                name: 'Movie1',
                genre: 'Genre1'
            },
            {
                name: 'Movie2',
                genre: 'Genre2'
            },
            {
                name: 'Movie3',
                genre: 'Genre3'
            },
            {
                name: 'Movie4',
                genre: 'Genre1'
            },
            {
                name: 'Movie5',
                genre: 'Genre2'
            },
            {
                name: 'Movie6',
                genre: 'Genre3'
            }
        ];
    }

    addMovie() {
        let modal = this.modalCtrl.create(AddMoviePage);
        modal.onDidDismiss((movie) => {
            if (movie) {
                this.movies.push(movie);
            }
        });
        modal.present();
    }

    removeMovie(movie: movie) {
        this.movies.splice(this.movies.indexOf(movie), 1);
    }

    getGenres() {
        let genres: string[] = [];
        for (let i = 0; i < this.movies.length; i++) {
            if (!this.arrayContains(genres, this.movies[i].genre)) {
                genres.push(this.movies[i].genre);
            }
        }
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
        let movies: movie[] = [];
        for (let i = 0; i < this.movies.length; i++) {
            if (this.movies[i].genre == genre) {
                movies.push(this.movies[i]);
            }
        }
        return movies;
    }
}

interface movie {
    name: string;
    genre: string;
}