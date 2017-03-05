import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class Api {
	private cache: any[] = [];

	constructor(
		public storage: Storage,
		public http: Http
	) {

	}

	save(): void {
		/*this.storage.set('cache', JSON.stringify(this.cache));
		console.log('cache saved');*/
	}

	load(): void {
		/*this.storage.get('cache').then((cache) => {
			if (cache) {
				this.cache = JSON.parse(cache);
				console.log('cache loaded');
				console.log(this.cache);
			}
		});*/
	}

	add(cached: any): void {
		this.cache.push(cached);
		this.save();
	}

	get(id: string): Observable<any> {
		console.log('getting response with id: ' + id);
		for (let i = 0; i < this.cache.length; i++) {
			if (this.cache[i].id == id) {
				console.log('response in cache');
				return Observable.of(this.cache[i].response);
			}
		}
		/*return Observable.of({
			Title: 'Up',
			Year: '2009',
			Poster: 'http://lorempixel.com/100/100/',
			Rated: 'PG',
			Runtime: '1h 36min',
			Genre: 'Animation, Adventure, Comedy',
			Released: '29 May 2009',
			Plot: 'Seventy-eight year old Carl Fredricksen travels to Paradise Falls in his home equipped with balloons, inadvertently taking a young stowaway.',
			Director: 'Pete Docter, Bob Peterson',
			Writer: ' Pete Docter (story by), Bob Peterson (story by)',
			Actors: 'Edward Asner, Jordan Nagai, John Ratzenberger',
			Awards: 'Won 2 Oscars',
			Language: 'English',
			Country: 'USA',
			Metascore: 88,
			imdbRating: '8.3',
			imdbVotes: '702,863',
			imdbID: '1'
		});*/
		return this.http.get('/api?i=' + id + '&plot=short&r=json').map((response) => {
			console.log('response downloaded');
			response = response.json();
			this.add({
				id: id,
				response: response
			});
			return response;
		});
	}

	search(query: string, page: number): Observable<any> {
		console.log('getting response for query: ' + query + ' and page: ' + page);
		for (let i = 0; i < this.cache.length; i++) {
			if (this.cache[i].query == query && this.cache[i].page == page) {
				console.log('response in cache');
				return Observable.of(this.cache[i].response);
			}
		}
		/*if (page == 4) {
			return Observable.of({
				Response: 'False'
			})
		}
		return Observable.of({
			Search: [
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
				},
				{
					Title: 'Movie 10',
					Year: '2017',
					Poster: 'http://lorempixel.com/100/100/',
					imdbID: 10
				}
			]
		});*/
		return this.http.get('/api?s=' + query + '&type=movie&r=json&page=' + page).map((response) => {
			console.log('response downloaded');
			response = response.json();
			this.add({
				query: query,
				page: page,
				response: response
			});
			return response;
		});
	}
}
