import { Component } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { NavController, ViewController, ModalController, AlertController } from 'ionic-angular';

import { CreateMoviePage } from '../create-movie/create-movie';

@Component({
    selector: 'page-add-movie',
    templateUrl: 'add-movie.html'
})
export class AddMoviePage {
    movies: any[];
    title: string;

    constructor(public navCtrl: NavController, public viewCtrl: ViewController, public modalCtrl: ModalController, public alertCtrl: AlertController, public http: Http) {
        this.movies = viewCtrl.data.movies;
    }

    createMovieMenu() {
        let modal = this.modalCtrl.create(CreateMoviePage, {
            movies: this.movies
        });
        modal.onDidDismiss((success) => {
            if (success) {
                this.viewCtrl.dismiss();
            }
        });
        modal.present();
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }

    searchMovie() {
        if (!this.title) {
            let alert = this.alertCtrl.create({
                title: 'You must enter a name',
                buttons: ['OK']
            });
            alert.present();
            return;
        }
        this.http.get('http://www.omdbapi.com/?t=' + this.title + '&y=&plot=short&r=json').subscribe(data => {
                let movie = data.json();
                console.log(movie);
                if (movie.Response == 'False') {
                    switch (movie.Error) {
                        case 'Movie not found!':
                            let confirm = this.alertCtrl.create({
                                title: 'Movie not found!',
                                message: 'Do you want to create an custom entry?',
                                buttons: [
                                    {
                                        text: 'No'
                                    },
                                    {
                                        text: 'Yes',
                                        handler: () => {
                                            this.createMovieMenu();
                                        }
                                    }
                                ]
                            });
                            confirm.present();
                            return;
                        default:
                            let alert = this.alertCtrl.create({
                                title: movie.Error,
                                buttons: ['OK']
                            });
                            alert.present();
                            return;
                    }
                }
                for (let i = 0; i < this.movies.length; i++) {
                    if (this.movies[i].Title == movie.Title) {
                        let alert = this.alertCtrl.create({
                            title: 'Movie already listed!',
                            buttons: ['OK']
                        });
                        alert.present();
                        return;
                    }
                }
                this.movies.push(movie);
                this.viewCtrl.dismiss();
            }
        );
    }
}