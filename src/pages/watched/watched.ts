import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Movies } from '../../providers/movies';

@Component({
  selector: 'page-watched',
  templateUrl: 'watched.html'
})
export class WatchedPage {
  constructor(public navCtrl: NavController, public movies: Movies) {

  }
}
