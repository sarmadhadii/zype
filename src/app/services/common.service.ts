import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserService } from './user.service';
import { IScore } from '../interfaces/score';
import { IConfidence } from '../interfaces/confidence';
import { TPerformance } from '../components/analytics/analytics.component';

@Injectable({
    providedIn: 'root'
})
export class CommonService {

    public testInProgress$: BehaviorSubject<boolean> = new BehaviorSubject(false);

    constructor(public userService: UserService) { }

    public setTestInProgress(): void {
        this.testInProgress$.next(true);
    }

    public stopTest(): void {
        this.testInProgress$.next(false);
    }

    public returnFormattedDataForAlphabetGraph(alphabet: string): [data: any, options: any] {
        const scores = this.returnedSpecificScores(this.userService.user.analytics.scores);
        if (scores.length >= 1) {
            const data = {
                labels: scores.map((score: any) => {
                    return score.played;
                }).sort((a: any, b: any) => a - b),
                datasets: [
                    {
                        label: 'Accuracy',
                        data: scores.map((score: any) => {
                            return this.getAccuracyFromLetter(score.letterConfidences[alphabet]);
                        }),
                        fill: false,
                        borderColor: '#70798c'
                    }
                ]
            };
            const options = {
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        min: 0,
                        max: 100
                    }

                }
            };
            return [data, options];
        } else {
            return [{}, {}];
        }
    }

    public returnFormattedDataForAverageSpeedGraph(): [data: any, options: any] {
        const scores = this.returnedSpecificScores(this.userService.user.analytics.scores);
        if (scores.length >= 1) {
            const data = {
                labels: scores.map((score: any) => {
                    return score.played;
                }).sort((a: any, b: any) => a - b),
                datasets: [
                    {
                        label: 'Average Speed',
                        data: scores.map((score: any) => score.speed),
                        fill: false,
                        borderColor: '#70798c'
                    }
                ]
            };
            const options = {
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        min: 0,
                        max: this.findHighestAverageSpeed() + 10
                    }

                }
            };
            return [data, options];
        } else {
            return [{}, {}];
        }
    }

    public findHighestAverageSpeed(): number {
        const scores = this.userService.user.analytics.scores;
        if (scores.length) {
            return Math.max(...scores.map((score: any) => score.speed));
        } else {
            return 0;
        }
    }

    public returnedSpecificScores(scores: IScore[]): IScore[] {
        const length = scores.length;
        const interval = Math.ceil(length / 10); // Calculate the interval to select values

        const filteredScores = scores.filter((_, index) => {
            // Include the first value and every interval-th value thereafter
            return index === 0 || (index + 1) % interval === 0 || index === length - 1;
        });

        return filteredScores;
    }

    public returnFormattedDataForAlphabetsTable(): { alphabet: string, accuracy: number, performance: TPerformance }[] {
        const alphabets = this.userService.getAllowedAlphabets();
        const returnData = alphabets.map((alphabet: string) => {
            const accuracy = this.getAccuracyFromLetter(this.userService.user.analytics.letterConfidences[alphabet]);
            const performance = this.getPerformaceForSingleLetter(alphabet);
            return { alphabet, accuracy, performance };
        });
        return returnData;
    }

    public getAccuracyFromLetter(letterConfidence: IConfidence): number {
        return Math.floor((letterConfidence.successfulAttempts / letterConfidence.attemptedAmount) * 100);
    }


    /***
     * Basically, this functions returns the performance of a single letter. 
     * It does this by calculating the average IMPROVEMENT of the letter over the last 5 scores that were saved in currentUser.analytics.scores
     */
    public getPerformaceForSingleLetter(letter: string): TPerformance {
        const scores = this.userService.user.analytics.scores;
        const letterConfidences = this.userService.user.analytics.letterConfidences;
        const letterConfidence = letterConfidences[letter];
        if (scores.length >= 5 && letterConfidence) {
            const lastFiveScores = scores.slice(scores.length - 5, scores.length);
            const lastFiveLetterConfidences = lastFiveScores.map((score: IScore) => score.letterConfidences[letter]);
            const averageImprovement = this.getAverageImprovementOfLetter(lastFiveLetterConfidences);
            if (averageImprovement > 5) {
                return 'excellent';
            } else if (averageImprovement > 0) {
                return 'good'
            } else {
                return 'average';
            }
        } else {
            const lastScores = scores;
            const lastLetterConfidences = lastScores.map((score: IScore) => score.letterConfidences[letter]);
            const averageImprovement = this.getAverageImprovementOfLetter(lastLetterConfidences);
            if (averageImprovement > 10) {
                return 'excellent';
            } else if (averageImprovement > 0) {
                return 'good'
            } else {
                return 'average';
            }
        }
    }


    public getAverageImprovementOfLetter(lastFiveLetterConfidences: IConfidence[]): number {
        let totalImprovement = 0;
        for (let i = 0; i < lastFiveLetterConfidences.length - 1; i ++) {
            const curr = lastFiveLetterConfidences[i];
            const next = lastFiveLetterConfidences[i + 1];
            if (next && curr) {
                totalImprovement += this.getAccuracyFromLetter(next) - this.getAccuracyFromLetter(curr);
            }
        }
        return (totalImprovement / lastFiveLetterConfidences.length);
    }

}
