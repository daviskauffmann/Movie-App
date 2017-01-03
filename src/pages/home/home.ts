import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { AddMoviePage } from '../add-movie/add-movie';
import { MovieInfoPage } from '../movie-info/movie-info';

import { Movies } from '../../providers/movies';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    public genreFilter: string = '';

    constructor(public navCtrl: NavController, public movieService: Movies) {
    }

    addMovie() {
        this.navCtrl.push(AddMoviePage);
    }

    getGenres(): string[] {
        let genres: string[] = [];
        for (let i = 0; i < this.movieService.movies.length; i++) {
            if (!this.arrayContains(genres, this.movieService.movies[i].Genre)) {
                genres.push(this.movieService.movies[i].Genre);
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
        let movies = this.movieService.movies.filter((movie) => {
            return movie.Genre == genre;
        });
        return movies.sort();
    }

    movieInfo(movie: any): void {
        this.navCtrl.push(MovieInfoPage, {
            movie: movie
        });
    }

    removeMovie(movie: any): void {
        this.movieService.removeMovie(movie);
    }
}