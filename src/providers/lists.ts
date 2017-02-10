import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class Lists {
	private lists: any[] = [
		{
			name: 'To Watch',
			description: 'Movies you want to watch',
			movies: [
				{
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
				}
			]
		},
		{
			name: 'Watched',
			description: 'Movies you have watched',
			movies: [
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
				},
				{
					Title: 'Movie 10',
					Year: '2017',
					Poster: 'http://lorempixel.com/100/100/',
					imdbID: 10
				},
				{
					Title: 'Movie 11',
					Year: '2017',
					Poster: 'http://lorempixel.com/100/100/',
					imdbID: 11
				},
				{
					Title: 'Movie 12',
					Year: '2017',
					Poster: 'http://lorempixel.com/100/100/',
					imdbID: 12
				}
			]
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
