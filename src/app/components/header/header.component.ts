import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
    public faBars = faBars;

    constructor(public authService: AuthService){
    }


}
