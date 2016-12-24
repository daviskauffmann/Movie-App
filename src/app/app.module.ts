import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AddMoviePage } from '../pages/add-movie/add-movie';
import { MovieInfoPage } from '../pages/movie-info/movie-info';

@NgModule({
    declarations: [
        MyApp,
        HomePage,
        AddMoviePage,
        MovieInfoPage
    ],
    imports: [
        IonicModule.forRoot(MyApp)
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage,
        AddMoviePage,
        MovieInfoPage
    ],
    providers: [{ provide: ErrorHandler, useClass: IonicErrorHandler }]
})
export class AppModule { }
