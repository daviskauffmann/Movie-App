import { Component } from '@angular/core';
import { ViewController, AlertController } from 'ionic-angular';

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

  constructor(public viewCtrl: ViewController, public alertCtrl: AlertController) {
    this.title = viewCtrl.data.title;
  }

  cancel(): void {
    this.viewCtrl.dismiss();
  }

  done(): void {
    if (!this.title) {
      let alert = this.alertCtrl.create({
        title: 'Must enter a title.',
        buttons: ['Ok']
      });
      alert.present();
      return;
    }
    if (!this.genre) {
      let alert = this.alertCtrl.create({
        title: 'Must enter a genre.',
        buttons: ['Ok']
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
    this.viewCtrl.dismiss(movie);
  }
}
