import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class Reviews {
	private reviews: any[] = [];
	
	constructor(public storage: Storage) {
		
	}

	save(): void {
		this.storage.set('reviews', JSON.stringify(this.reviews));
		console.log('reviews saved');
	}

	load(): void {
		this.storage.get('reviews').then((value) => {
			if (value) {
				this.reviews = JSON.parse(value);
				console.log('reviews loaded');
				console.log(this.reviews);
			}
		});
	}

	add(review: any): void {
		this.reviews.push(review);
		this.save();
	}

	remove(review: any): void {
		this.reviews.splice(this.reviews.indexOf(review), 1);
		this.save();
	}

	get(filter?: string): any[] {
		let reviews: any[] = this.reviews;
		if (filter && filter.trim() != '') {
			reviews = reviews.filter((value) => {
				return value.movie.Title.toLowerCase().indexOf(filter.toLowerCase()) > -1;
			});
		}
		return reviews.sort((a, b) => {
			return a.movie.Title.toLowerCase() < b.movie.Title.toLowerCase() ? -1 : a.movie.Title.toLowerCase() > b.movie.Title.toLowerCase() ? 1 : 0;
		});
	}
}
