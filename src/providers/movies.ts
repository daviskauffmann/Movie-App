import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class Movies {
	private movies: any[] = [];
	private lists: any[] = [];

	constructor(public storage: Storage) {
		//storage.clear();
		this.lists.push({
			name: 'To Watch',
			description: 'Movies you want to watch'
		});
		this.lists.push({
			name: 'Watched',
			description: 'Movies you have watched'
		});
		this.load();
	}

	save(): void {
		this.storage.set('movies', JSON.stringify(this.movies));
		console.log('movies saved');
		this.storage.set('lists', JSON.stringify(this.lists));
		console.log('lists saved');
	}

	load(): void {
		this.storage.get('movies').then((value) => {
			if (value) {
				this.movies = JSON.parse(value);
				console.log(this.movies);
			}
		});
		this.storage.get('lists').then((value) => {
			if (value) {
				this.lists = JSON.parse(value);
				console.log(this.lists);
			}
		});
	}

	addMovie(movie: any): void {
		this.movies.push(movie);
		this.save();
	}

	removeMovie(movie: any): void {
		this.movies.splice(this.movies.indexOf(movie), 1);
		this.save();
	}

	getMovies(list?: any, genre?: string, filter?: string): any[] {
		let movies: any[] = [];
		for (let i = 0; i < this.movies.length; i++) {
			movies.push(this.movies[i]);
		}
		if (list) {
			movies = movies.filter((value, index, array) => {
				for (let i = 0; i < value.listNames.length; i++) {
					if (value.listNames[i] == list.name) {
						return true;
					}
				}
			});
		}
		if (genre) {
			movies = movies.filter((value, index, array) => {
				return value.Genre == genre;
			});
		}
		if (filter && filter.trim() != '') {
			movies = movies.filter((value, index, array) => {
				return value.toLowerCase().indexOf(filter.toLowerCase()) > -1;
			});
		}
		return movies.sort((a, b) => {
			return a.Title.toLowerCase() < b.Title.toLowerCase() ? -1 : a.Title.toLowerCase() > b.Title.toLowerCase() ? 1 : 0;
		});
	}

	getGenres(list?: any, filter?: string): string[] {
		let genres: string[] = [];
		let movies: any[] = this.getMovies(list);
		for (let i = 0; i < movies.length; i++) {
			if (genres.indexOf(movies[i].Genre) < 0) {
				genres.push(movies[i].Genre);
			}
		}
		if (filter && filter.trim() != '') {
			genres = genres.filter((value, index, array) => {
				return value.toLowerCase().indexOf(filter.toLowerCase()) > -1;
			});
		}
		return genres.sort();
	}

	addList(list: any): void {
		this.lists.push(list);
		this.save();
	}

	removeList(list: any): void {
		this.lists.splice(this.lists.indexOf(list), 1);
		for (let i = 0; i < this.movies.length; i++) {
			for (let j = 0; j < this.movies[i].listNames.length; j++) {
				if (this.movies[i].listNames[j] == list.name) {
					this.movies[i].listNames.splice(j, 1);
				}
			}
		}
		this.save();
	}

	getLists(filter?: string): any[] {
		let lists: any[] = [];
		for (let i = 0; i < this.lists.length; i++) {
			lists.push(this.lists[i]);
		}
		if (filter && filter.trim() != '') {
			lists = lists.filter((value, index, array) => {
				return value.name.toLowerCase().indexOf(filter.toLowerCase()) > -1;
			});
		}
		return lists.sort((a, b) => {
			return a.name.toLowerCase() < b.name.toLowerCase() ? -1 : a.name.toLowerCase() > b.name.toLowerCase() ? 1 : 0;
		});
	}
}
