import { Component } from '@angular/core';

@Component({
	selector: 'page-top-10',
	templateUrl: 'top-10.html'
})
export class Top10Page {
	movies: any[] = [];

	constructor() {
		for (let i = 0; i < 10; i++) {
			this.movies.push({
				rank: i + 1
			});
		}
	}
}
