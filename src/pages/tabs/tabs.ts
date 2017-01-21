import { Component } from '@angular/core';

import { ToWatchPage } from '../to-watch/to-watch';
import { WatchedPage } from '../watched/watched';

@Component({
	templateUrl: 'tabs.html'
})
export class TabsPage {
	tab1Root: any = ToWatchPage;
	tab2Root: any = WatchedPage;

	constructor() {

	}
}
