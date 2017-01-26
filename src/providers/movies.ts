import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class Movies {
  toWatch: any[] = [];
  watched: any[] = [];

  constructor(public storage: Storage) {

  }

	save(): void {
    this.storage.set('toWatch', JSON.stringify(this.toWatch));
    this.storage.set('watched', JSON.stringify(this.watched));
  }

  loadToWatch(): Promise<any> {
    return this.storage.get('toWatch').then((value) => {
      if (value) {
        this.toWatch = JSON.parse(value);
      }
    });
  }

	loadWatched(): Promise<any> {
    return this.storage.get('watched').then((value) => {
      if (value) {
        this.watched = JSON.parse(value);
      }
    });
  }

  addToWatch(movie: any): void {
    this.toWatch.push(movie);
    this.save();
  }

  removeToWatch(movie: any): void {
    this.toWatch.splice(this.toWatch.indexOf(movie), 1);
    this.save();
  }

  addWatched(movie: any): void {
    this.watched.push(movie);
    this.save();
  }

  removeWatched(movie: any): void {
    this.watched.splice(this.watched.indexOf(movie), 1);
    this.save();
  }
}
