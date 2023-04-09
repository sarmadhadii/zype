import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    public isLogin: boolean = true;
    public formInput = {
        username: '',
        email: '', 
        password: ''
    };

    constructor(
        public authService: AuthService,
        public loaderService: LoaderService,
        public router: Router
    ){
        this.loaderService.stopLoading();
    }

    public formSubmitted(): void {
        this.loaderService.startLoading();
        if (this.isLogin) {
            this.authService.signIn(this.formInput.email, this.formInput.password).catch(err => {
                console.error(err.message);
            }).finally(() => {
                this.loaderService.stopLoading();
            });

        } else {
            this.authService.signUp(this.formInput.email, this.formInput.password, this.formInput.username).catch(err => {
                console.error(err.message);
            }).finally(() => {
                this.loaderService.stopLoading();
            });
        }
    }
}
