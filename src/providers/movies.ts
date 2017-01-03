import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage';

@Injectable()
export class Movies {
    public movies: any[] = [];

    constructor(public storageService: Storage) {
        this.storageService.get('movies').then((movies) => {
            if (movies) {
                this.movies = JSON.parse(movies);
            }
        });
    }

    public addMovie(movie: any): void {
        this.movies.push(movie);
        this.saveMovies();
    }

    public removeMovie(movie: any): void {
        this.movies.splice(this.movies.indexOf(movie), 1);
        this.saveMovies();
    }

    public saveMovies(): void {
        this.storageService.set('movies', JSON.stringify(this.movies));
    }
}
