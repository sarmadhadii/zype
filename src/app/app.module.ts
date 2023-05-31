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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { LetterConfidenceComponent } from './components/letter-confidence/letter-confidence.component';
import { TooltipModule } from 'primeng/tooltip';
import { SidebarModule } from 'primeng/sidebar';
import { NumberSuffixPipe } from './pipes/number-suffix.pipe';


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
        ToastModule,
        OverlayPanelModule,
        ConfirmDialogModule,
        SidebarModule,
        TooltipModule
    ],
    declarations: [
        AppComponent,
        HeaderComponent,
        MenuComponent,
        LoginComponent,
        LoaderComponent,
        TestComponent,
        LetterConfidenceComponent,
        NumberSuffixPipe
    ],
    bootstrap: [AppComponent],
    providers: [
        {
            provide: FIREBASE_OPTIONS,
            useValue: environment.firebase,
        },
        MessageService,
        ConfirmationService
    ]
})
export class AppModule { 
}