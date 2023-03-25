import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { WordsService } from 'src/app/services/words.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
    public currentWordList: string[] = [];
    public currentIndex: number = 6;

    constructor(
        public wordsService: WordsService,
        public userService: UserService
    ) {}

    public ngOnInit(): void {
        this.currentWordList = this.wordsService.generateWords(this.userService.getAllowedAlphabets());
    }
}
