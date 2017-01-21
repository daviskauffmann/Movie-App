import { Component } from '@angular/core';
import { NavController, ViewController, AlertController } from 'ionic-angular';
import { Movies } from '../../providers/movies';

@Component({
    selector: 'page-edit-movie',
    templateUrl: 'edit-movie.html'
})
export class EditMoviePage {
    movie: any;
    title: string;
    genre: string;
    year: string;
    rated: string;
    runtime: string;
    released: string;
    country: string;
    plot: string;
    director: string;
    writer: string;
    actors: string;
    awards: string;

    constructor(public navCtrl: NavController, public viewCtrl: ViewController, public alertCtrl: AlertController, public movies: Movies) {
        this.movie = viewCtrl.data.movie;
        this.title = this.movie.Title;
        this.genre = this.movie.Genre;
        this.year = this.movie.Year;
        this.rated = this.movie.Rated;
        this.runtime = this.movie.Runtime;
        this.released = this.movie.Released;
        this.country = this.movie.Country;
        this.plot = this.movie.Plot;
        this.director = this.movie.Director;
        this.writer = this.movie.Writer;
        this.actors = this.movie.Actors;
        this.awards = this.movie.Awards;
    }

    cancel(): void {
        this.viewCtrl.dismiss();
    }

    done(): void {
        if (!this.title) {
            let alert = this.alertCtrl.create({
                title: 'Must enter a title',
                buttons: ['OK']
            });
            alert.present();
            return;
        }
        if (!this.genre) {
            let alert = this.alertCtrl.create({
                title: 'Must enter a genre',
                buttons: ['OK']
            });
            alert.present();
            return;
        }
        this.movie.Title = this.title;
        this.movie.Genre = this.genre;
        this.movie.Year = this.year;
        this.movie.Rated = this.rated;
        this.movie.Runtime = this.runtime;
        this.movie.Released = this.released;
        this.movie.Country = this.country;
        this.movie.Plot = this.plot;
        this.movie.Director = this.director
        this.movie.Writer = this.writer;
        this.movie.Actors = this.actors;
        this.movie.Awards = this.awards;
        this.movies.save();
        this.viewCtrl.dismiss();
    }
}