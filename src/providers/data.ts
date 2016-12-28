import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class Data {
    constructor(public storage: Storage) {

    }

    getData(key: string) {
        return this.storage.get(key);
    }

    setData(key: string, value: any) {
        this.storage.set(key, JSON.stringify(value));
    }
}
