import { Component, OnInit } from '@angular/core';
import { LoaderService } from './services/loader.service';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    constructor(
        public loaderService: LoaderService,
        public authService: AuthService,
        public userService: UserService
    ){
        this.loaderService.startLoading();
    }

    ngOnInit(): void {
        this.authService.initUserChecking();
    }
}
