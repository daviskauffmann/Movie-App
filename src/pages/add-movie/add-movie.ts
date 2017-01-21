import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { NavController, ModalController, AlertController, LoadingController } from 'ionic-angular';
import { CreateMoviePage } from '../create-movie/create-movie';
import { Movies } from '../../providers/movies';

@Component({
    selector: 'page-add-movie',
    templateUrl: 'add-movie.html'
})
export class AddMoviePage {
    title: string;

    constructor(public navCtrl: NavController, public modalCtrl: ModalController, public alertCtrl: AlertController, public http: Http, public loadingCtrl: LoadingController, public movies: Movies) {

    }

    createMovie(): void {
        let modal = this.modalCtrl.create(CreateMoviePage, {
            title: this.title
        });
        modal.onDidDismiss((success) => {
            if (success) {
                this.navCtrl.pop();
            }
        });
        modal.present();
    }

    addMovie(): void {
        if (!this.title) {
            let alert = this.alertCtrl.create({
                title: 'Must enter a title.',
                buttons: ['OK']
            });
            alert.present();
            return;
        }
        let loader = this.loadingCtrl.create({
            content: 'Searching...',
        });
        loader.present();
        let response = this.http.get('http://www.omdbapi.com/?t=' + this.title + '&y=&plot=short&r=json');
        response.subscribe(
            (value) => {
                let movie = value.json();
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
                for (let i = 0; i < this.movies.toWatch.length; i++) {
                    if (this.movies.toWatch[i].Title == movie.Title) {
                        let alert = this.alertCtrl.create({
                            title: 'Movie already listed!',
                            buttons: ['OK']
                        });
                        alert.present();
                        return;
                    }
                }
                this.movies.addToWatch(movie);
                this.navCtrl.pop();
            },
            (error) => {
                loader.dismiss();
                console.log(error);
            },
            () => {
                loader.dismiss();
            }
        );
    }
}