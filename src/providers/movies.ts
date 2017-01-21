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
		this.storage.get('toWatch').then((toWatch) => {
            if (toWatch) {
                this.toWatch = JSON.parse(toWatch);
            }
        });
	}

	public save(): void {
        this.storage.set('toWatch', JSON.stringify(this.toWatch));
    }

    public addToWatch(movie: any): void {
        this.toWatch.push(movie);
        this.save();
    }

    public removeToWatch(movie: any): void {
        this.toWatch.splice(this.toWatch.indexOf(movie), 1);
        this.save();
    }
}
