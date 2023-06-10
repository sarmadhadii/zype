import { Component, OnInit } from '@angular/core';
import { LoaderService } from './services/loader.service';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    constructor(
        public loaderService: LoaderService,
        public authService: AuthService,
        public userService: UserService,
        public primengMessageService: MessageService
    ){
        this.loaderService.startLoading();
    }

    ngOnInit(): void {
        this.authService.initUserChecking();
    }
}
