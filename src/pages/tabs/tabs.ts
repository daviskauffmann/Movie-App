import { Component } from '@angular/core';

import { SearchPage } from '../search/search';
import { MoviesPage } from '../movies/movies';
import { ReviewsPage } from '../reviews/reviews';
import { Top10Page } from '../top-10/top-10';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tab1Root: any = SearchPage;
  tab2Root: any = MoviesPage;
	tab3Root: any = ReviewsPage;
	tab4Root: any = Top10Page;

  constructor() {
		
  }
}
