import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class Movies {
	movies: any[] = [];
	lists: any[] = [];

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
		this.loadMovies().then(() => {
			console.log(this.movies);
		});
		this.loadLists().then(() => {
			console.log(this.lists);
		});
	}

	save(): void {
		this.storage.set('movies', JSON.stringify(this.movies));
		this.storage.set('lists', JSON.stringify(this.lists));
	}

	loadMovies(): Promise<any> {
		return this.storage.get('movies').then((value) => {
			if (value) {
				this.movies = JSON.parse(value);
			}
		});
	}

	loadLists(): Promise<any> {
		return this.storage.get('lists').then((value) => {
			if (value) {
				this.lists = JSON.parse(value);
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

	addList(list: any): void {
		this.lists.push(list);
		this.save();
	}

	removeList(list: any): void {
		this.lists.splice(this.lists.indexOf(list), 1);
		for (let i = 0; i < this.movies.length; i++) {
			for (let j = 0; j < this.movies[i].ListNames.length; j++) {
				if (this.movies[i].ListNames[j] == list.name) {
					this.movies[i].ListNames.splice(j, 1);
				}
			}
		}
		this.save();
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

	getMovies(list?: any, genre?: string): any[] {
		let movies: any[] = this.movies;
		if (list) {
			movies = movies.filter((value, index, array) => {
				for (let i = 0; i < value.ListNames.length; i++) {
					if (value.ListNames[i] == list.name) {
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
		return movies.sort((a, b) => {
			return a.Title.toLowerCase() < b.Title.toLowerCase() ? -1 : a.Title.toLowerCase() > b.Title.toLowerCase() ? 1 : 0;
		});
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
