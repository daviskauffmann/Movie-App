import { Component } from '@angular/core';

import { SearchPage } from '../search/search';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tab1Root: any = SearchPage;
  tab2Root: any = HomePage;
	tab3Root: any = SearchPage;

  constructor() {
		
  }
}
