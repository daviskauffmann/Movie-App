import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

@Component({
  selector: 'page-rate-movie',
  templateUrl: 'rate-movie.html'
})
export class RateMoviePage {
	movie: any;

  constructor(public viewCtrl: ViewController) {
		this.movie = viewCtrl.data.movie;
	}

	cancel() {
		this.viewCtrl.dismiss();
	}

	done() {
		this.viewCtrl.dismiss();
	}
}
