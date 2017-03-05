import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { reorderArray } from 'ionic-angular';

@Injectable()
export class Top10 {
	private top10: any[] = [
		/*{
			Title: 'Movie 1',
			Year: '2017',
			Poster: 'http://lorempixel.com/100/100/',
			imdbID: 1
		},
		{
			Title: 'Movie 2',
			Year: '2017',
			Poster: 'http://lorempixel.com/100/100/',
			imdbID: 2
		},
		{
			Title: 'Movie 3',
			Year: '2017',
			Poster: 'http://lorempixel.com/100/100/',
			imdbID: 3
		},
		{
			Title: 'Movie 4',
			Year: '2017',
			Poster: 'http://lorempixel.com/100/100/',
			imdbID: 4
		},
		{
			Title: 'Movie 5',
			Year: '2017',
			Poster: 'http://lorempixel.com/100/100/',
			imdbID: 5
		},
		{
			Title: 'Movie 6',
			Year: '2017',
			Poster: 'http://lorempixel.com/100/100/',
			imdbID: 6
		},
		{
			Title: 'Movie 7',
			Year: '2017',
			Poster: 'http://lorempixel.com/100/100/',
			imdbID: 7
		},
		{
			Title: 'Movie 8',
			Year: '2017',
			Poster: 'http://lorempixel.com/100/100/',
			imdbID: 8
		},
		{
			Title: 'Movie 9',
			Year: '2017',
			Poster: 'http://lorempixel.com/100/100/',
			imdbID: 9
		}*/
	];

	constructor(public storage: Storage) {

	}

	save(): void {
		this.storage.set('top10', JSON.stringify(this.top10));
		console.log('top10 saved');
	}

	load(): void {
		this.storage.get('top10').then((top10) => {
			if (top10) {
				this.top10 = JSON.parse(top10);
				console.log('top10 loaded');
				console.log(this.top10);
			}
		});
	}

	add(movie: any): void {
		this.top10.push(movie);
		this.save();
	}

	remove(movie: any): void {
		this.top10.splice(this.top10.indexOf(movie), 1);
		this.save();
	}

	reorder(indexes): void {
		this.top10 = reorderArray(this.top10, indexes);
		this.save();
	}

	get(): any[] {
		let top10: any[] = this.top10;
		return top10;
	}
}
