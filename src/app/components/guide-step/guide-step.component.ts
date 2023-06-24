import { Component, Input } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { GuideService } from 'src/app/services/guide.service';

@Component({
  selector: 'app-guide-step',
  templateUrl: './guide-step.component.html',
  styleUrls: ['./guide-step.component.scss']
})
export class GuideStepComponent {
    
    public faTimes = faTimes;

    constructor(public guideService: GuideService) {}

}
