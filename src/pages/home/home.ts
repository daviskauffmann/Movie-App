import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

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
    public filteredMovies: any[];

    constructor(public navCtrl: NavController) {
        this.movies = [];
        this.filteredMovies = this.movies;
    }

    addMovie() {
        this.navCtrl.push(AddMoviePage, {
            movies: this.movies
        });
    }

    filterMovies(e: any) {
        this.filteredMovies = this.movies;
        let val = e.target.value;
        console.log(val);
        if (val && val.trim() != '') {
            this.filteredMovies = this.movies.filter((movie) => {
                return (movie.Title.toLowerCase().indexOf(val.toLowerCase()) > -1);
            })
        }
    }

    getGenres() {
        let genres: string[] = [];
        for (let i = 0; i < this.filteredMovies.length; i++) {
            if (!this.arrayContains(genres, this.filteredMovies[i].Genre)) {
                genres.push(this.filteredMovies[i].Genre);
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
        for (let i = 0; i < this.filteredMovies.length; i++) {
            if (this.filteredMovies[i].Genre == genre) {
                movies.push(this.filteredMovies[i]);
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