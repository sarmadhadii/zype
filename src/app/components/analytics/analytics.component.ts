import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { CommonService } from 'src/app/services/common.service';

export type TPerformance = 'good' | 'excellent' | 'average';

@Component({
    selector: 'app-analytics',
    templateUrl: './analytics.component.html',
    styleUrls: ['./analytics.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class AnalyticsComponent implements OnInit {

    public currentActiveAlphabet: string | null = null;

    public faReturn = faArrowLeft;

    //the data and options here are for the average speed graph
    public data: any = null;
    public options: any = null;

    //the data for the alphabets table
    public alphabetsData: { alphabet: string, accuracy: number, performance: string }[] = [];

    constructor(public commonService: CommonService) { }

    ngOnInit(): void {
        [this.data, this.options] = this.commonService.returnFormattedDataForAverageSpeedGraph();
        this.alphabetsData = this.commonService.returnFormattedDataForAlphabetsTable();

    }
}