import { Component } from '@angular/core';
import { faBars, faQuestion, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { ConfirmationService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';
import { CommonService } from 'src/app/services/common.service';
import { GuideService } from 'src/app/services/guide.service';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
    public faBars = faBars;
    public faLogout = faRightFromBracket;
    public faQuestion = faQuestion;

    constructor(
        public authService: AuthService,
        public loaderService: LoaderService,
        public primengConfirmService: ConfirmationService,
        public commonService: CommonService,
        public guideService: GuideService
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

    public startGuide(): void {
        this.guideService.startGuide();
    }
}
