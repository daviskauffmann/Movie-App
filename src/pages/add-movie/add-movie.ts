import { Component } from '@angular/core';

import { NavController, ViewController } from 'ionic-angular';

@Component({
    selector: 'page-add-movie',
    templateUrl: 'add-movie.html'
})
export class AddMoviePage {
    name: string;
    genre: string;

    constructor(public navCtrl: NavController, public viewCtrl: ViewController) {

    }

    dismiss() {
        this.viewCtrl.dismiss();
    }

    saveMovie() {
        let movie = {
            name: this.name,
            genre: this.genre
        }
        this.viewCtrl.dismiss(movie);
    }
}