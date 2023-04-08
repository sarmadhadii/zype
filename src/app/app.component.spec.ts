import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { LoaderService } from './services/loader.service';
import { loaderServiceStub } from './stubs/loaderServiceStub';
import { AuthService } from './services/auth.service';
import { authServiceStub } from './stubs/authServiceStub';
import { UserService } from './services/user.service';
import { userServiceStub } from './stubs/userServiceStub';
import { HeaderComponent } from './components/header/header.component';

describe('AppComponent', () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,                
            ],
            declarations: [
                AppComponent,
                HeaderComponent
            ],
            providers: [
                { provide: LoaderService, useFactory: () => loaderServiceStub },
                { provide: AuthService, useFactory: () => authServiceStub },
                { provide: UserService, useFactory: () => userServiceStub }
            ]
        }).compileComponents();
    });

    it('should create the app', () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });
});
