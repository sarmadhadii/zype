import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { AuthService } from 'src/app/services/auth.service';
import { authServiceStub } from 'src/app/stubs/authServiceStub';
import { LoaderService } from 'src/app/services/loader.service';
import { loaderServiceStub } from 'src/app/stubs/loaderServiceStub';
import { routerStub } from 'src/app/stubs/routerStub';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

describe('LoginComponent', () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [LoginComponent],
            providers: [
                { provide: AuthService, useFactory: () => authServiceStub },
                { provide: LoaderService, useFactory: () => loaderServiceStub },
                { provide: Router, useFactory: () => routerStub },
            ],
            imports: [
                FormsModule
            ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
