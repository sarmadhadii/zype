import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { faBars, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { ConfirmationService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
    public faBars = faBars;
    public faLogout = faRightFromBracket;

    constructor(
        public authService: AuthService,
        public loaderService: LoaderService,
        public primengConfirmService: ConfirmationService
    ){ }


    public confirmLogout() {
        this.primengConfirmService.confirm({
            message: 'Are you sure you want to logout?',
            header: 'Confirm Logout',
            accept: () => {
                this.authService.logout();
            }
        })
    }
}
