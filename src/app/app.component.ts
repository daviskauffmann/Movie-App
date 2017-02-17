import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { Storage } from '@ionic/storage';

import { TutorialPage } from '../pages/tutorial/tutorial';
import { TabsPage } from '../pages/tabs/tabs';

import { Api } from '../providers/api';
import { Lists } from '../providers/lists';
import { Reviews } from '../providers/reviews';
import { Top10 } from '../providers/top-10';

@Component({
	templateUrl: 'app.html'
})
export class MyApp {
	rootPage: any;

	constructor(platform: Platform,
		public storage: Storage,
		public api: Api,
		public lists: Lists,
		public reviews: Reviews,
		public top10: Top10
	) {
		this.storage.clear();
		this.storage.get('hasSeenTutorial').then((hasSeenTutorial) => {
			//if (hasSeenTutorial) {
				this.rootPage = TabsPage;
			//} else {
			//  this.rootPage = TutorialPage;
			//}
			platform.ready().then(() => {
				// Okay, so the platform is ready and our plugins are available.
				// Here you can do any higher level native things you might need.
				StatusBar.styleDefault();
				Splashscreen.hide();
			});
		});
		this.api.load();
		this.lists.load();
		this.reviews.load();
		this.top10.load();
	}
}
