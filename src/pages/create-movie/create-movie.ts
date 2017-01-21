import { Component } from '@angular/core';
import { NavController, ViewController, AlertController } from 'ionic-angular';
import { Movies } from '../../providers/movies';

@Component({
    selector: 'page-create-movie',
    templateUrl: 'create-movie.html'
})
export class CreateMoviePage {
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
        this.title = viewCtrl.data.title;
    }

    cancel(): void {
        this.viewCtrl.dismiss();
    }

    done(): void {
        if (!this.title) {
            let alert = this.alertCtrl.create({
                title: 'Must enter a title.',
                buttons: ['OK']
            });
            alert.present();
            return;
        }
        if (!this.genre) {
            let alert = this.alertCtrl.create({
                title: 'Must enter a genre.',
                buttons: ['OK']
            });
            alert.present();
            return;
        }
        let movie = {
            Title: this.title,
            Genre: this.genre,
            Year: this.year,
            Rated: this.rated,
            Runtime: this.runtime,
            Released: this.released,
            Country: this.country,
            Plot: this.plot,
            Director: this.director,
            Writer: this.writer,
            Actors: this.actors,
            Awards: this.awards
        }
        this.movies.addToWatch(movie);
        this.viewCtrl.dismiss(true);
    }
}