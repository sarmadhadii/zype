import { Component, Input, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-letter-stats',
  templateUrl: './letter-stats.component.html',
  styleUrls: ['./letter-stats.component.scss']
})
export class LetterStatsComponent implements OnInit {

    @Input() letter!: string;

    //the data and options here are for the letter speed graph
    public data: any = null;
    public options: any = null;
    

    constructor(
        public commonService: CommonService
    ){}

    ngOnInit(): void {
        if (this.letter) {
            [this.data, this.options] = this.commonService.returnFormattedDataForAlphabetGraph(this.letter);
        } 
    }
}
