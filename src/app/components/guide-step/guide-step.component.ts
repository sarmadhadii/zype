import { Component, Input } from '@angular/core';
import { GuideService } from 'src/app/services/guide.service';

@Component({
  selector: 'app-guide-step',
  templateUrl: './guide-step.component.html',
  styleUrls: ['./guide-step.component.scss']
})
export class GuideStepComponent {
    
    constructor(public guideService: GuideService) {}

}
