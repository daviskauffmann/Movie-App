import { Component } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { NavController, ModalController, AlertController } from 'ionic-angular';

import { AddMoviePage } from '../add-movie/add-movie';
import { MovieInfoPage } from '../movie-info/movie-info';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    public movies: any[] = [];

    constructor(public navCtrl: NavController, public modalCtrl: ModalController, public alertCtrl: AlertController, public http: Http) {
        this.addMovie('Fight Club');
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

    addMovie(name: string) {
        this.http.get('http://www.omdbapi.com/?t=' + name + '&y=&plot=short&r=json')
            .subscribe(data => {
                let movie = data.json();
                console.log(movie);
                for (let i = 0; i < this.movies.length; i++) {
                    if (this.movies[i].Title == movie.Title) {
                        movie.Response = 'False';
                        movie.Error = 'Movie already listed!';
                    }
                }
                if (movie.Response == "False") {
                    let alert = this.alertCtrl.create({
                        title: movie.Error,
                        buttons: ['OK']
                    });
                    alert.present();
                    return;
                }
                this.movies.push(movie);
            });
    }

    removeMovie(movie: any) {
        this.movies.splice(this.movies.indexOf(movie), 1);
    }

    addMovieMenu() {
        let modal = this.modalCtrl.create(AddMoviePage);
        modal.onDidDismiss((name) => {
            if (name) {
                this.addMovie(name);
            }
        });
        modal.present();
    }

    movieInfoMenu(movie: any) {
        this.navCtrl.push(MovieInfoPage, {
            movie: movie
        });
    }
}