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
		this.storage.set('cache', JSON.stringify(this.cache));
		console.log('cache saved');
	}

	load(): void {
		this.storage.get('cache').then((value) => {
			if (value) {
				this.cache = JSON.parse(value);
				console.log('cache loaded');
				console.log(this.cache);
			}
		});
	}	

	getByID(id: string): any {
		for (let i = 0; i < this.cache.length; i++) {
			if (this.cache[i].imdbID == id) {
				return Observable.create((observer) => {
					observer.next(this.cache[i]);
					observer.complete();
				});
			}
		}
		return this.http.get('http://www.omdbapi.com/?i=' + id + '&plot=short&r=json').map((value) => {
			let movie = value.json();
			this.cache.push(movie);
			this.save();
			return movie;
		});
	}

	getByTitle(title: string): any {
		return this.http.get('http://www.omdbapi.com/?t=' + title + '&plot=short&r=json').map((value) => {
			return value.json();
		});
	}

	search(query: string): any {
		return this.http.get('http://www.omdbapi.com/?s=' + query + '&type=movie&r=json&page=1').map((value) => {
			return value.json();
		});
	}
}
