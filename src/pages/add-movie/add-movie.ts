import { Component } from '@angular/core';

import { NavController, ViewController, AlertController } from 'ionic-angular';

@Component({
    selector: 'page-add-movie',
    templateUrl: 'add-movie.html'
})
export class AddMoviePage {
    name: string;

    constructor(public navCtrl: NavController, public viewCtrl: ViewController, public alertCtrl: AlertController) {

    }

    dismiss() {
        this.viewCtrl.dismiss();
    }

    addMovie() {
        if (!this.name) {
            let alert = this.alertCtrl.create({
                title: 'You must enter a name',
                buttons: ['OK']
            });
            alert.present();
            return;
        }
        this.viewCtrl.dismiss(this.name);
    }
}