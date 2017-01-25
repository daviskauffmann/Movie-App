import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class Movies {
  public toWatch: any[] = [];
  public watched: any[] = [];

  constructor(public storage: Storage) {
    this.load();
  }

  public load(): void {
    this.storage.get('toWatch').then((value) => {
      if (value) {
        this.toWatch = JSON.parse(value);
      }
    });
    this.storage.get('watched').then((value) => {
      if (value) {
        this.watched = JSON.parse(value);
      }
    });
  }

  public save(): void {
    this.storage.set('toWatch', JSON.stringify(this.toWatch));
    this.storage.set('watched', JSON.stringify(this.watched));
  }

  public addToWatch(movie: any): void {
    this.toWatch.push(movie);
    this.save();
  }

  public removeToWatch(movie: any): void {
    this.toWatch.splice(this.toWatch.indexOf(movie), 1);
    this.save();
  }

  public addWatched(movie: any): void {
    this.watched.push(movie);
    this.save();
  }

  public removeWatched(movie: any): void {
    this.watched.splice(this.watched.indexOf(movie), 1);
    this.save();
  }
}
