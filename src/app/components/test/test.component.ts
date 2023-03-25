import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, takeWhile, tap, timer } from 'rxjs';
import { LoaderService } from 'src/app/services/loader.service';
import { UserService } from 'src/app/services/user.service';
import { WordsService } from 'src/app/services/words.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})

export class TestComponent implements OnInit {
    public currentWordList: string[] = [];
    public currentIndex: number = 0;
    public currentWordInput: string = '';
    public currentWordHTML: string = '';
    public previousWord: string = '';
    public timerValue: number = 30;

    @ViewChild('inputField') inputFieldElem: any;

    constructor(
        public wordsService: WordsService,
        public userService: UserService,
        public loaderService: LoaderService,
    ) {
        this.loaderService.startLoading();
    }

    public ngOnInit(): void {
        this.initWordList();
        // this.currentWordInput = this.currentWordList[this.currentIndex];
        setTimeout(() => {
            this.loaderService.endLoading();
            this.startTimer();
        }, 2000);
    }

    public initWordList(): void {
        this.currentIndex = 0;
        this.currentWordList = this.wordsService.generateWords(this.userService.getAllowedAlphabets());
        this.currentWordInputChanged();
    }

    public currentWordInputChanged(): void {
        if (this.previousWord.length > this.currentWordInput.length) {
            this.currentWordInput = this.previousWord;
            this.inputFieldElem.nativeElement.value = this.currentWordInput;
            return;
        }
        let fullWord = this.currentWordList[this.currentIndex];
        if (fullWord === this.currentWordInput) {
            if (this.currentWordList.length - this.currentIndex === 1) {
                this.initWordList();
            } else {
                this.currentIndex++;
            }

            this.currentWordInput = '';
            fullWord = this.currentWordList[this.currentIndex]
        }
        let html = '';
        for (let i = 0; i < fullWord.length; i++) {
            if (!this.currentWordInput[i]) {
                html += `<span class="dark-grey">${fullWord[i]}</span>`
            } else if (this.currentWordInput[i] === fullWord[i]) {
                html += `<span class="blue-grey">${fullWord[i]}</span>`
            } else if (this.currentWordInput[i] !== fullWord[i]) {
                if (this.currentWordInput[i - 1] === fullWord[i - 1]) {
                    this.currentWordInput = this.currentWordInput.slice(0, this.currentWordInput.length - 1);
                    this.inputFieldElem.nativeElement.value = this.currentWordInput;
                    html += `<span class="dark-red">${fullWord[i]}</span>`
                } else {
                    html += `<span class="dark-grey">${fullWord[i]}</span>`
                }
            }
        }
        this.previousWord = this.currentWordInput;
        this.currentWordHTML = html;
    }

    public startTimer(): void {
        timer(0, 1000).pipe(
            takeWhile(() => this.timerValue > 0),
            tap(() => this.timerValue--)
        ).subscribe()
    }
    
}
