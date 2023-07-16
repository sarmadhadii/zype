import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { faBars, faChartLine, faHome, faQuestion, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { ConfirmationService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
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
    public faChartLine = faChartLine;
    public faHome = faHome;

    public currentPage: string = 'test';

    private ngUnsubscribe = new Subject<void>();

    constructor(
        public authService: AuthService,
        public loaderService: LoaderService,
        public primengConfirmService: ConfirmationService,
        public commonService: CommonService,
        public guideService: GuideService,
        private router: Router
    ){

        // subsribe to the router events to get the current page
        this.router.events
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe((event) => {
                if (event instanceof NavigationEnd) {
                    this.currentPage = event.url;

                    console.log('current page: ', this.currentPage)
                }
            });
    }


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

    public ngOnDestroy(): void {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }

}
