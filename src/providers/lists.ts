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
		this.storage.get('lists').then((lists) => {
			if (lists) {
				this.lists = JSON.parse(lists);
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
			lists = lists.filter((list) => {
				return list.name.toLowerCase().indexOf(filter.toLowerCase()) > -1;
			});
		}
		return lists.sort((list1, list2) => {
			return list1.name.toLowerCase() < list2.name.toLowerCase() ? -1
			: list1.name.toLowerCase() > list2.name.toLowerCase() ? 1
			: 0;
		});
	}

	addMovie(list: any, movie: any) {
		list.movies.push(movie);
		this.save();
	}

	removeMovie(list: any, movie: any) {
		list.movies.splice(list.movies.indexOf(movie), 1);
		this.save();
	}

	getMovies(list?: any, filter?: string): any[] {
		let movies: any[] = [];
		if (list) {
			movies = list.movies;
		} else {
			this.lists.forEach((list) => {
				list.movies.forEach((movie) => {
					if (!movies.some((existing) => {
						return existing.imdbID == movie.imdbID;
					})) {
						movies.push(movie);
					}
				});
			});
		}
		if (filter && filter.trim() != '') {
			movies = movies.filter((movie) => {
				return movie.Title.toLowerCase().indexOf(filter.toLowerCase()) > -1;
			});
		}
		return movies.sort((movie1, movie2) => {
			return movie1.Title.toLowerCase() < movie2.Title.toLowerCase() ? -1
			: movie1.Title.toLowerCase() > movie2.Title.toLowerCase() ? 1
			: 0;
		});
	}
}
