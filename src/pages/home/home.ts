import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { AddMoviePage } from '../add-movie/add-movie';
import { MovieInfoPage } from '../movie-info/movie-info';

import { Data } from '../../providers/data';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    // image on list
    // SQL database? local?
    public movies: any[];
    public genreFilter: string;

    constructor(public navCtrl: NavController, public data: Data) {
        this.movies = [];
        data.getData('movies').then((movies) => {
            if (movies) {
                this.movies = JSON.parse(movies);
            }
        });
        this.genreFilter = '';
    }

    addMovie() {
        this.navCtrl.push(AddMoviePage, {
            movies: this.movies
        });
    }

    getGenres(): string[] {
        let genres: string[] = [];
        for (let i = 0; i < this.movies.length; i++) {
            if (!this.arrayContains(genres, this.movies[i].Genre)) {
                genres.push(this.movies[i].Genre);
            }
        }
        if (this.genreFilter && this.genreFilter.trim() != '') {
            genres = genres.filter((genre) => {
                return (genre.toLowerCase().indexOf(this.genreFilter.toLowerCase()) > -1);
            });
        }
        return genres.sort();
    }

    arrayContains(array: any[], element: any): boolean {
        for (let i = 0; i < array.length; i++) {
            if (array[i] == element) {
                return true;
            }
        }
        return false;
    }

    getMovies(genre: string): any[] {
        let movies = this.movies.filter((movie) => {
            return movie.Genre == genre;
        });
        return movies.sort();
    }

    movieInfo(movie: any): void {
        this.navCtrl.push(MovieInfoPage, {
            movies: this.movies,
            movie: movie
        });
    }

    removeMovie(movie: any): void {
        this.movies.splice(this.movies.indexOf(movie), 1);
    }
}