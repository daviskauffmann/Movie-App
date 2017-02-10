import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class Movies {
	private cache: any[] = [];
	private apiKey: string = '1f9e595c276fb6c99c4ae06adfd2ed9b';

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

	get(id: string): Observable<any> {
		console.log('getting movie with id: ' + id);
		for (let i = 0; i < this.cache.length; i++) {
			if (this.cache[i].id == id) {
				console.log('movie in cache');
				return Observable.of(this.cache[i].movie);
			}
		}
		/*return Observable.of({

		});*/
		/*return this.http.get('http://www.omdbapi.com/?i=' + id + '&plot=short&r=json').map((value) => {
			console.log('movie downloaded');
			let movie = value.json();
			this.cache.push({
				id: id,
				movie: movie
			});
			this.save();
			return movie;
		});*/
		return this.http.get('https://api.themoviedb.org/3/movie/' + id + '?api_key=' + this.apiKey).map((value) => {
			console.log('movie downloaded');
			let movie = value.json();
			this.cache.push(movie);
			this.save();
			return movie;
		});
	}

	search(query: string, page: number): Observable<any> {
		console.log('getting results for query: ' + query);
		for (let i = 0; i < this.cache.length; i++) {
			if (this.cache[i].query == query && this.cache[i].page == page) {
				console.log('results in cache');
				return Observable.of(this.cache[i].results);
			}
		}
		/*return Observable.of({
			Search: [
				{
					Title: 'Movie 1',
					Year: "2017",
					imdbID: 1
				},
				{
					Title: 'Movie 2',
					Year: "2017",
					imdbID: 2
				},
				{
					Title: 'Movie 3',
					Year: "2017",
					imdbID: 3
				},
				{
					Title: 'Movie 4',
					Year: "2017",
					imdbID: 4
				},
				{
					Title: 'Movie 5',
					Year: "2017",
					imdbID: 5
				},
				{
					Title: 'Movie 6',
					Year: "2017",
					imdbID: 6
				},
				{
					Title: 'Movie 7',
					Year: "2017",
					imdbID: 7
				},
				{
					Title: 'Movie 8',
					Year: "2017",
					imdbID: 8
				},
				{
					Title: 'Movie 9',
					Year: "2017",
					imdbID: 9
				},
				{
					Title: 'Movie 10',
					Year: "2017",
					imdbID: 10
				}
			]
		});*/
		/*return this.http.get('http://www.omdbapi.com/?s=' + query + '&type=movie&r=json&page=' + page).map((value) => {
			console.log('results downloaded');
			let results = value.json();
			this.cache.push({
				query: query,
				page: page,
				results: results
			});
			this.save();
			return results;
		});*/
		return this.http.get('https://api.themoviedb.org/3/search/movie?query=' + query + '&api_key=' + this.apiKey).map((value) => {
			console.log('results downloaded');
			let results = value.json();
			results.query = query;
			this.cache.push(results);
			this.save();
			return results;
		});
	}
}
