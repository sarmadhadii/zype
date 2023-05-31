import { Component, Input } from '@angular/core';
import { IConfidence } from 'src/app/interfaces/confidence';
import { MessagesService } from 'src/app/services/messages.service';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-letter-confidence',
    templateUrl: './letter-confidence.component.html',
    styleUrls: ['./letter-confidence.component.scss']
})
export class LetterConfidenceComponent {
    @Input() letter!: string;

    public letterData: IConfidence = {} as IConfidence;
    public accuracyPercentage: number = 0;

    constructor(
        public userService: UserService,
        public messagesService: MessagesService
    ) { }

    ngOnInit(): void {
        if (this.userService?.user?.analytics?.letterConfidences?.[this.letter]) {
            this.letterData = this.userService.user.analytics.letterConfidences[this.letter];
            this.accuracyPercentage = Math.floor((this.letterData.successfulAttempts / this.letterData.attemptedAmount) * 100)
        } else {
            this.messagesService.showMessage(`Alphabet '${this.letter}' does not have any data`, 'error', true);
        }
    }
}
