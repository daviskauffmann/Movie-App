import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class Lists {
	private lists: any[] = [
		{
			name: 'To Watch',
			description: 'Movies you want to watch',
			movies: []
		},
		{
			name: 'Watched',
			description: 'Movies you have watched',
			movies: []
		}
	];

	constructor(public storage: Storage) {
		
	}

	save(): void {
		this.storage.set('lists', JSON.stringify(this.lists));
		console.log('lists saved');
	}

	load(): void {
		this.storage.get('lists').then((value) => {
			if (value) {
				this.lists = JSON.parse(value);
				console.log('lists loaded');
				console.log(this.lists);
			}
		});
	}

	add(list: any): void {
		this.lists.push(list);
		this.save();
	}

	remove(list: any): void {
		this.lists.splice(this.lists.indexOf(list), 1);
		this.save();
	}

	get(filter?: string): any[] {
		let lists: any[] = this.lists;
		if (filter && filter.trim() != '') {
			lists = lists.filter((value) => {
				return value.name.toLowerCase().indexOf(filter.toLowerCase()) > -1;
			});
		}
		return lists.sort((a, b) => {
			return a.name.toLowerCase() < b.name.toLowerCase() ? -1 : a.name.toLowerCase() > b.name.toLowerCase() ? 1 : 0;
		});
	}

	getMovies(list?: any, filter?: string): any[] {
		let movies: any[] = [];
		if (list) {
			movies = list.movies;
		} else {
			this.lists.forEach((value) => {
				value.movies.forEach((value) => {
					let contains = false;
					for (let i = 0; i < movies.length; i++) {
						if (movies[i].imdbID == value.imdbID) {
							contains = true;
							break;
						}
					}
					if (!contains) {
						movies.push(value);
					}
				});
			});
		}
		if (filter && filter.trim() != '') {
			movies = movies.filter((value) => {
				return value.Title.toLowerCase().indexOf(filter.toLowerCase()) > -1;
			});
		}
		return movies.sort((a, b) => {
			return a.Title.toLowerCase() < b.Title.toLowerCase() ? -1 : a.Title.toLowerCase() > b.Title.toLowerCase() ? 1 : 0;
		});
	}
}
