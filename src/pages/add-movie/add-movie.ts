import { Component } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { NavController, NavParams, ModalController, AlertController, LoadingController } from 'ionic-angular';

import { CreateMoviePage } from '../create-movie/create-movie';

@Component({
    selector: 'page-add-movie',
    templateUrl: 'add-movie.html'
})
export class AddMoviePage {
    movies: any[];
    title: string;

    constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public alertCtrl: AlertController, public http: Http, public loadingCtrl: LoadingController) {
        this.movies = navParams.data.movies;
    }

    createMovie() {
        let modal = this.modalCtrl.create(CreateMoviePage, {
            movies: this.movies,
            title: this.title
        });
        modal.onDidDismiss((success) => {
            if (success) {
                this.navCtrl.pop();
            }
        });
        modal.present();
    }

    addMovie() {
        if (!this.title) {
            let alert = this.alertCtrl.create({
                title: 'You must enter a title',
                buttons: ['OK']
            });
            alert.present();
            return;
        }
        let response = this.http.get('http://www.omdbapi.com/?t=' + this.title + '&y=&plot=short&r=json');
        let loader = this.loadingCtrl.create({
            content: 'Searching...',
        });
        loader.present();
        response.subscribe(
            (value) => {
                console.log(value);
                let movie = value.json();
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
                                            this.createMovie();
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
                this.navCtrl.pop();
            },
            (error) => {
                loader.dismiss();
                console.log(error);
            },
            () => {
                loader.dismiss();
                console.log('success');
            }
        );
    }
}