import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class Movies {
	private cache: any[] = [];

	constructor(public storage: Storage,
	public http: Http) {

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
		for (let i = 0; i < this.cache.length; i++) {
			if (this.cache[i].imdbID == id) {
				console.log('movie in cache');
				return Observable.create((observer) => {
					observer.next(this.cache[i]);
					observer.complete();
				});
			}
		}
		return this.http.get('http://www.omdbapi.com/?i=' + id + '&plot=short&r=json').map((value) => {
			console.log('movie downloaded');
			let movie = value.json();
			this.cache.push(movie);
			this.save();
			return movie;
		});
	}

	search(query: string): Observable<any> {
		for (let i = 0; i < this.cache.length; i++) {
			if (this.cache[i].query == query) {
				console.log('results in cache');
				return Observable.create((observer) => {
					observer.next(this.cache[i]);
					observer.complete();
				});
			}
		}
		return this.http.get('http://www.omdbapi.com/?s=' + query + '&type=movie&r=json').map((value) => {
			console.log('results downloaded');
			let results = value.json();
			results.query = query;
			this.cache.push(results);
			this.save();
			return results;
		});
	}
}
