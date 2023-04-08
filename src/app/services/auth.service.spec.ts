import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { userServiceStub } from '../stubs/userServiceStub';
import { UserService } from './user.service';
import { DataService } from './data.service';
import { dataServiceStub } from '../stubs/dataServiceStub';
import { LoaderService } from './loader.service';
import { loaderServiceStub } from '../stubs/loaderServiceStub';
import { Router } from '@angular/router';
import { routerStub } from '../stubs/routerStub';
import { Auth } from '@angular/fire/auth';
import { FirebaseApp } from '@angular/fire/app';

describe('AuthService', () => {
    let service: AuthService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                { provide: UserService, useFactory: () => userServiceStub },
                { provide: DataService, useFactory: () => dataServiceStub },
                { provide: LoaderService, useFactory: () => loaderServiceStub },
                { provide: Router, useFactory: () => routerStub },
                { provide: Auth, useFactory: () => <Auth>{}},
                { provide: FirebaseApp, useFactory: () => <FirebaseApp>{}}
                
            ],
            imports: []
        });
        service = TestBed.inject(AuthService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
