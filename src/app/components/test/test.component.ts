import { Component, OnInit, ViewChild, asNativeElements } from '@angular/core';
import { faRepeat } from '@fortawesome/free-solid-svg-icons';
import { Observable, generate, takeWhile, tap, timer } from 'rxjs';
import { IConfidence } from 'src/app/interfaces/confidence';
import { DataService } from 'src/app/services/data.service';
import { LoaderService } from 'src/app/services/loader.service';
import { UserService } from 'src/app/services/user.service';
import { WordsService } from 'src/app/services/words.service';
import { fullAlphabet, generateConfidences, recursiveDeepCopy, toTwoDecimalPlaces } from 'src/app/shared/utils';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})

export class TestComponent implements OnInit {

    public faRepeat = faRepeat;
    public currentWordList: string[] = [];
    public currentIndex: number = 0;
    public currentWordInput: string = '';
    public currentWordHTML: string = '';
    public previousWord: string = '';
    public timerValue: number = 30;
    public showResults: boolean = false;
    public timerStarted: boolean = false;
    public correctlyWrittenWord: string = '';
    public incorrectlyWrittenAlphabet: string = '';
    public activeLetters: string[] = [];
    public letterConfidencesSidebar: boolean = false;
    public currentTestScore = {
        percentage: 0, 
        totalWords: 0,
        totalAttemptedAlphabets: 0, 
        totalCorrectlyAttemptedAlphabets: 0,
        letterConfidences: <{[key: string] : IConfidence}>generateConfidences(),
        speed: 0
    }

    @ViewChild('inputField') inputFieldElem: any;

    constructor(
        public wordsService: WordsService,
        public userService: UserService,
        public loaderService: LoaderService,
        public dataService: DataService
    ) {
        this.loaderService.stopLoading();
    }

    public ngOnInit(): void {
        if (this.userService?.user?.analytics?.letterConfidences) {
            this.activeLetters = this.userService.getAllowedAlphabets();
        }
        this.initWordList();
        this.selectInputField();
    }

    public initWordList(): void {
        this.currentIndex = 0;
        this.currentWordList = this.wordsService.generateWords(this.userService.getAllowedAlphabets());
        this.currentWordInputChanged(true);
        this.correctlyWrittenWord = '';
        this.incorrectlyWrittenAlphabet = '';
    }

    public initTest(): void {
        for (let alphabet of fullAlphabet) {
            this.currentTestScore.letterConfidences[alphabet].allowed = this.userService.user.analytics.letterConfidences[alphabet].allowed;
        }
    }
    

    //TODO - DIVIDE IN SEPARATE FUNCTIONS
    public currentWordInputChanged(manualTrigger: boolean = false): void {
        if (!manualTrigger) {
            this.checkTimer();
        }

        // hacky way to check for backspace... but works so leaving in for now... 
        if (this.checkBackspace()) {
            return;
        }

        const lastInput = this.currentWordInput[this.currentWordInput.length - 1]; //gets us the last alphabet for testing
        
        if (this.currentWordInput.length) {
            this.generateScores(lastInput);
        }
        
        let fullWord = this.currentWordList[this.currentIndex];
        const comparingAlphabet = fullWord[this.correctlyWrittenWord.length];

       
        if (fullWord === this.correctlyWrittenWord + lastInput) { // word has been completed
            this.currentTestScore.totalWords++;
            if (this.currentWordList.length - this.currentIndex === 1) {
                this.initWordList();
            } else {
                this.currentIndex++;
            }

            this.currentWordInput = '';
            fullWord = this.currentWordList[this.currentIndex];
            this.correctlyWrittenWord = '';
            this.incorrectlyWrittenAlphabet = '';
            
        } else if (comparingAlphabet === lastInput) { // word has not been completed but still matches
            this.correctlyWrittenWord += lastInput;
            this.incorrectlyWrittenAlphabet = '';
        } else if (comparingAlphabet !== lastInput && !manualTrigger) { // does not match 
            this.incorrectlyWrittenAlphabet = comparingAlphabet;
        }

        this.generateDisplayedWordHTML(fullWord);
    }

    public startTimer(): void {
        timer(0, 1000).pipe(
            takeWhile(() => this.timerValue > 0),
            tap(() => this.reduceTimerValue())
        ).subscribe(() => {
            this.timerStarted = true;
        })
    }

    public generateDisplayedWordHTML(fullWord: string): void {
        let html = '';
        for (let i = 0; i < this.correctlyWrittenWord.length; i++) {
            html += `<span class="blue-grey">${this.correctlyWrittenWord[i]}</span>`
        }
        if (this.incorrectlyWrittenAlphabet) {
            html += `<span class="dark-red">${this.incorrectlyWrittenAlphabet}</span>`
        }
        for (let i = (this.correctlyWrittenWord + this.incorrectlyWrittenAlphabet).length; i < fullWord.length; i++) {
            html += `<span class="dark-grey">${fullWord[i]}</span>`
        }

        this.previousWord = this.currentWordInput;
        this.currentWordHTML = html;
    }

    public checkBackspace(): boolean {
        // hacky way to check for backspace... but works so leaving in for now... 
        if (this.previousWord.length > this.currentWordInput.length) {
            this.currentWordInput = this.previousWord;
            if (this.inputFieldElem?.nativeElement) {
                this.inputFieldElem.nativeElement.value = this.currentWordInput;
            }
            return true;
        }
        return false;
    }

    public checkTimer(): void {
        if (!this.timerStarted && this.currentWordInput.length >= 0) {
            this.startTimer();
        }
    }

    public reduceTimerValue(): void {
        this.timerValue--;
        if (this.timerValue === 0) {
            this.completeTest();
        }
    }

    public generateScores(lastAttempt: string): void {
        console.log(recursiveDeepCopy(this.currentTestScore));
        if (lastAttempt) {
            this.currentTestScore.totalAttemptedAlphabets++;
            if (this.currentTestScore?.letterConfidences?.[lastAttempt]?.allowed) {
                this.currentTestScore.letterConfidences[lastAttempt].attemptedAmount++;
            }
            if (lastAttempt === this.currentWordList[this.currentIndex][this.currentWordInput.length - 1]) {
                this.currentTestScore.totalCorrectlyAttemptedAlphabets++;
                this.currentTestScore.letterConfidences[lastAttempt].successfulAttempts++;
            }
        };
        console.log(recursiveDeepCopy(this.currentTestScore));
    }

    public resetCurrentTestScore(): void {
        this.currentTestScore = {
            percentage: 0, 
            totalWords: 0,
            totalAttemptedAlphabets: 0, 
            totalCorrectlyAttemptedAlphabets: 0,
            letterConfidences: <{[key: string] : IConfidence}>generateConfidences(),
            speed: 0
        }
    }
    
    public completeTest(): void {
        this.currentTestScore.speed = (this.currentTestScore.totalWords * 2);
        this.currentTestScore.percentage = Math.floor((this.currentTestScore.totalCorrectlyAttemptedAlphabets / this.currentTestScore.totalAttemptedAlphabets) * 100);
        this.userService.user.analytics.played++;
        if (this.userService.user.analytics.played === 0) {
            this.userService.user.analytics.averageSpeed = this.currentTestScore.speed;
        } else {
            this.userService.user.analytics.averageSpeed = Math.round(((this.userService.user.analytics.averageSpeed * (this.userService.user.analytics.played - 1)) + this.currentTestScore.speed) / this.userService.user.analytics.played);
        }
        for (let letter of fullAlphabet) {
            this.userService.user.analytics.letterConfidences[letter].attemptedAmount += this.currentTestScore.letterConfidences[letter].attemptedAmount;
            this.userService.user.analytics.letterConfidences[letter].successfulAttempts += this.currentTestScore.letterConfidences[letter].successfulAttempts;
        }
        this.showResults = true;
        this.dataService.updateUser(this.userService.user);

    }

    public selectInputField(): void {
        const inputField = this.inputFieldElem?.nativeElement as HTMLInputElement;
        if (inputField) {
            inputField.focus();
            inputField.click();
            inputField.onpaste = e => e.preventDefault();
        }
    }

    public retakeTest(): void {
        this.resetCurrentTestScore();
        this.showResults = false;
        this.timerValue = 30;
        this.currentWordInput = '';
        this.currentWordHTML = '';
        this.timerStarted = false;
        this.currentWordList = [];
        setTimeout(() => {
            this.initWordList();
            this.generateDisplayedWordHTML(this.currentWordList[0]);
        }, 0);
        
        setTimeout(() => {
            this.selectInputField();
        }, 100)
    }
    
}
