import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { FirebaseApp, firebaseApp$, provideFirebaseApp } from '@angular/fire/app';
import { initializeApp } from 'firebase/app';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { MenuComponent } from './components/menu/menu.component';
import { LoginComponent } from './components/login/login.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LoaderComponent } from './components/loader/loader.component';
import { TestComponent } from './components/test/test.component';
import { FormsModule } from '@angular/forms';


@NgModule({
    imports: [
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideAuth(() => getAuth()),
        provideFirestore(() => getFirestore()),
        BrowserModule,
        AppRoutingModule,
        FontAwesomeModule,
        FormsModule,
    ],
    declarations: [
        AppComponent,
        HeaderComponent,
        MenuComponent,
        LoginComponent,
        LoaderComponent,
        TestComponent
    ],
    bootstrap: [AppComponent],
    providers: [{
        provide: FIREBASE_OPTIONS,
        useValue: environment.firebase
    }, ]
})
export class AppModule { 
}