import { Component, OnInit, ViewChild, asNativeElements } from '@angular/core';
import { faArrowRight, faRepeat } from '@fortawesome/free-solid-svg-icons';
import { Observable, generate, takeWhile, tap, timer } from 'rxjs';
import { IConfidence } from 'src/app/interfaces/confidence';
import { CommonService } from 'src/app/services/common.service';
import { DataService } from 'src/app/services/data.service';
import { LoaderService } from 'src/app/services/loader.service';
import { UserService } from 'src/app/services/user.service';
import { WordsService } from 'src/app/services/words.service';
import { fullAlphabet, generateConfidences, recursiveDeepCopy, startingLetters, toTwoDecimalPlaces } from 'src/app/shared/utils';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})

export class TestComponent implements OnInit {

    public faRepeat = faRepeat;
    public faContinue = faArrowRight;
    public currentWordList: string[] = [];
    public nextWordList: string[] = [];
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
    public activeAlphabet: string = '';
    public newLetterCongratulation: string = '';
    public currentTestScore = {
        percentage: 0, 
        totalWords: 0,
        totalAttemptedAlphabets: 0, 
        totalCorrectlyAttemptedAlphabets: 0,
        letterConfidences: <{[key: string] : IConfidence}>generateConfidences(startingLetters),
        speed: 0
    }

    @ViewChild('inputField') inputFieldElem: any;

    constructor(
        public wordsService: WordsService,
        public userService: UserService,
        public loaderService: LoaderService,
        public dataService: DataService,
        public commonService: CommonService
    ) {
        this.loaderService.stopLoading();
    }

    public ngOnInit(): void {
        if (this.userService?.user?.analytics?.letterConfidences) {
            this.activeLetters = this.userService.getAllowedAlphabets();
            this.currentTestScore.letterConfidences = generateConfidences(this.activeLetters);
        }
        this.initNextWordList();
        this.initWordList();
        this.selectInputField();
    }

    public initWordList(): void {
        this.currentIndex = 0;
        this.currentWordList = [...this.nextWordList]; // deep copy array as need to delete this.nextWordList after this
        this.nextWordList = [];
        this.currentWordInputChanged(true);
        this.correctlyWrittenWord = '';
        this.incorrectlyWrittenAlphabet = '';
    }

    public initNextWordList(): void {
        const weakAlphabet: string = this.userService.getWeakestAlphabet();
        this.nextWordList = this.wordsService.generateWords(this.userService.getAllowedAlphabets(), 6, weakAlphabet);

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
            if ((this.currentWordList.length - this.currentIndex === 1) && !manualTrigger) {
                this.initWordList();
            } else {
                if (this.currentWordList.length - this.currentIndex === 2) {
                    this.initNextWordList();
                }
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
        this.commonService.setTestInProgress();
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

    /***
     * @param lastAttempt - the lastest alphabet that was attempted
     * @description - This function checks if the last attempted alphabet was allowed. 
     * If yes then increments the total attempted alphabets and the total correctly attempted alphabets accordingly 
     */
    public generateScores(lastAttempt: string): void {
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
    }

    public resetCurrentTestScore(): void {
        this.currentTestScore = {
            percentage: 0, 
            totalWords: 0,
            totalAttemptedAlphabets: 0, 
            totalCorrectlyAttemptedAlphabets: 0,
            letterConfidences: <{[key: string] : IConfidence}>generateConfidences(this.userService.getAllowedAlphabets()),
            speed: 0
        }
    }
    
    public completeTest(): void {

        //calculating speed and percentage + incrementing played
        this.currentTestScore.speed = (this.currentTestScore.totalWords * 2);
        this.currentTestScore.percentage = Math.floor((this.currentTestScore.totalCorrectlyAttemptedAlphabets / this.currentTestScore.totalAttemptedAlphabets) * 100);
        this.userService.user.analytics.played++;

        //checking if new score needs to be added to analytics
        if (this.userService.user.analytics.played % 25 === 0) {
            this.userService.user.analytics.scores.push({
                date: new Date(),
                speed: this.userService.user.analytics.averageSpeed,
                letterConfidences: this.userService.user.analytics.letterConfidences,
                played: this.userService.user.analytics.played
            });
        }

        //setting averageSpeed. Adding this conditional as can't divide by 0
        if (this.userService.user.analytics.played === 0) {
            this.userService.user.analytics.averageSpeed = this.currentTestScore.speed;
        } else {
            this.userService.user.analytics.averageSpeed = Math.round(((this.userService.user.analytics.averageSpeed * (this.userService.user.analytics.played - 1)) + this.currentTestScore.speed) / this.userService.user.analytics.played);
        }

        //updating letterConfidences with current test score
        for (let letter of fullAlphabet) {
            this.userService.user.analytics.letterConfidences[letter].attemptedAmount += this.currentTestScore.letterConfidences[letter].attemptedAmount;
            this.userService.user.analytics.letterConfidences[letter].successfulAttempts += this.currentTestScore.letterConfidences[letter].successfulAttempts;
        }

        //ending test and updating user
        this.checkIfNewAlphabetNeedsToBeAdded();
        this.commonService.stopTest();
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
        this.activeLetters = this.userService.getAllowedAlphabets();
        this.resetCurrentTestScore();
        this.showResults = false;
        this.timerValue = 30;
        this.currentWordInput = '';
        this.currentWordHTML = '';
        this.timerStarted = false;
        this.currentWordList = [];
        this.initNextWordList();
        setTimeout(() => {
            this.initWordList();
            this.generateDisplayedWordHTML(this.currentWordList[0]);
        }, 0);
        
        setTimeout(() => {
            this.selectInputField();
        }, 100)
    }

    public showLetterConfidenceSidebar(alphabet: string): void {
        this.activeAlphabet = alphabet;
        this.letterConfidencesSidebar = true;
    }

    /***
     * @description - This function checks if we can add a new alphabet to the allowed alphabets. We can add a new alphabet if:
     * 1. Each letter has more than 500 attempts
     * 2. Each letter has more than 75% success rate
     */

    public checkIfNewAlphabetNeedsToBeAdded(): void {
        const allowedAlphabets = this.userService.getAllowedAlphabets();
        const check: boolean = allowedAlphabets.every(alphabet => {
            const letterConfidence = this.userService.user.analytics.letterConfidences[alphabet];
            return (
                    ((letterConfidence.successfulAttempts / letterConfidence.attemptedAmount * 100) >= 75) && 
                    (letterConfidence.attemptedAmount >= 500)
                );
        });

        if (check) {
            const newAlphabetToUnlock = fullAlphabet.split('').find(alphabet => !allowedAlphabets.includes(alphabet));
            this.newLetterCongratulation = newAlphabetToUnlock ?? '';
            if (newAlphabetToUnlock) {
                this.userService.user.analytics.letterConfidences[newAlphabetToUnlock].allowed = true;
                this.activeLetters = this.userService.getAllowedAlphabets();
            } else {
                this.showResults = true;
            }
        } else {
            this.showResults = true;
        }

    }
    
}
