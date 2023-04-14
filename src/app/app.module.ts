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
import { LetterConfidencesComponent } from './components/letter-confidences/letter-confidences.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';


@NgModule({
    imports: [
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideAuth(() => getAuth()),
        provideFirestore(() => getFirestore()),
        BrowserModule,
        AppRoutingModule,
        FontAwesomeModule,
        BrowserAnimationsModule,
        FormsModule,
        ToastModule
    ],
    declarations: [
        AppComponent,
        HeaderComponent,
        MenuComponent,
        LoginComponent,
        LoaderComponent,
        TestComponent,
        LetterConfidencesComponent
    ],
    bootstrap: [AppComponent],
    providers: [
        {
            provide: FIREBASE_OPTIONS,
            useValue: environment.firebase,
        },
        MessageService
    ]
})
export class AppModule { 
}