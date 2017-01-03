import { NgModule, ErrorHandler } from '@angular/core';

import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { Storage } from '@ionic/storage';

import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { AddMoviePage } from '../pages/add-movie/add-movie';
import { CreateMoviePage } from '../pages/create-movie/create-movie';
import { MovieInfoPage } from '../pages/movie-info/movie-info';
import { EditMoviePage } from '../pages/edit-movie/edit-movie';

import { Movies } from '../providers/movies';

@NgModule({
    declarations: [
        MyApp,
        HomePage,
        AddMoviePage,
        CreateMoviePage,
        MovieInfoPage,
        EditMoviePage
    ],
    imports: [
        IonicModule.forRoot(MyApp)
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage,
        AddMoviePage,
        CreateMoviePage,
        MovieInfoPage,
        EditMoviePage
    ],
    providers: [{ provide: ErrorHandler, useClass: IonicErrorHandler }, Storage, Movies]
})
export class AppModule { }
