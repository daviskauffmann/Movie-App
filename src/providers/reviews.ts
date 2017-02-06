import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class Reviews {
	private reviews: any[] = [
		{
			movie: {
				Title: 'Movie 1',
				Year: "2017",
				imdbID: 1
			},
			rating: 10,
			review: "It was good"
		},
		{
			movie: {
				Title: 'Movie 2',
				Year: "2017",
				imdbID: 2
			},
			rating: 10,
			review: "It was good"
		},
		{
			movie: {
				Title: 'Movie 3',
				Year: "2017",
				imdbID: 3
			},
			rating: 10,
			review: "It was good"
		},
		{
			movie: {
				Title: 'Movie 4',
				Year: "2017",
				imdbID: 4
			},
			rating: 10,
			review: "It was good"
		}
	];

	constructor(public storage: Storage) {

	}

	save(): void {
		this.storage.set('reviews', JSON.stringify(this.reviews));
		console.log('reviews saved');
	}

	load(): void {
		this.storage.get('reviews').then((reviews) => {
			if (reviews) {
				this.reviews = JSON.parse(reviews);
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
			reviews = reviews.filter((review) => {
				return review.movie.Title.toLowerCase().indexOf(filter.toLowerCase()) > -1;
			});
		}
		return reviews.sort((review1, review2) => {
			return review1.movie.Title.toLowerCase() < review2.movie.Title.toLowerCase() ? -1
				: review1.movie.Title.toLowerCase() > review2.movie.Title.toLowerCase() ? 1
					: 0;
		});
	}
}
