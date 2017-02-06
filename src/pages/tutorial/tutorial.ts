import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController, Slides } from 'ionic-angular';

import { TabsPage } from '../tabs/tabs';

@Component({
  selector: 'page-tutorial',
  templateUrl: 'tutorial.html'
})
export class TutorialPage {
  showSkip = true;

  constructor(
    public navCtrl: NavController,
    public storage: Storage
  ) {

	}

  startApp(): void {
    this.navCtrl.push(TabsPage).then(() => {
      this.storage.set('hasSeenTutorial', 'true');
    });
  }

  onSlideChangeStart(slides: Slides): void {
		console.log('a');
    this.showSkip = !slides.isEnd();
  }
}
