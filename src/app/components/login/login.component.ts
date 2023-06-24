import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { LoaderService } from 'src/app/services/loader.service';
import { MessagesService } from 'src/app/services/messages.service';

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
        public router: Router,
        public messagesService: MessagesService
    ){
        this.loaderService.stopLoading();
    }

    public formSubmitted(): void {
        this.loaderService.startLoading();
        if (this.isLogin) {
            this.authService.signIn(this.formInput.email, this.formInput.password).then(() => {
                this.goToTest();
                this.loaderService.stopLoading();
            }).catch(err => {
                console.error(err.message);
                const message = this.formatError(err.code);
                this.loaderService.stopLoading();
                this.messagesService.showMessage(message, 'error', true);
            });

        } else {
            this.authService.signUp(this.formInput.email, this.formInput.password, this.formInput.username).then(() => {
                this.goToTest();
                this.loaderService.stopLoading();
            }).catch(err => {
                console.error(err.message);
                const message = this.formatError(err.code);
                this.loaderService.stopLoading();
                this.messagesService.showMessage(message, 'error', true);
            });
        }
    }

    public formatError(code: string): string {
        switch (code) {
            case 'auth/invalid-email':
                return 'Email is invalid'
            
            case 'auth/wrong-password':
                return 'Password is invalid'
            
            case 'auth/too-many-requests':
                return 'Too many requests. Try again later.'
           
            case 'auth/user-not-found':
                return 'User not found.'
        
            default:
                return code;
        }
    }

    public goToTest(): void {
        this.router.navigateByUrl('/test');
    }
}
