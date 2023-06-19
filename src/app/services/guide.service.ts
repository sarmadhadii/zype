import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class GuideService {

    public guideConfig = {
        showing: false,
        currentStep: 0,
        steps: [
            {
                header: 'Welcome to the guide!',
                description: 'This guide will help you understand how to use the app. You can always access this guide from the top right corner of the screen.',
            },

            {
                header: 'Generated words',
                description: 'This is where you can see the words that were generated for you. Words will be composed of your active alphabets.',
            }, 

            {
                header: 'Input field',
                description: 'This is where you can type in your words. Each alphabet needs to be written correctly.',
            }, 

            {
                header: 'Timer and test stats',
                description: 'This is where you can see the timer and your test stats. Keep in mind that these are not your global stats, they only represent the current test.',
            }, 

            {
                header: 'Active alphabets',
                description: 'This is where you can see your active alphabets. The progress bar on the right shows your accuracy for each alphabet. To view the stats of a specific alphabet, click on it.',
            }, 

            {
                header: 'Progress till next alphabet',
                description: 'This is where you can see your progress till the next alphabet. Once you reach 100%, a new alphabet will be unlocked.',
            }
        ]
    }

    constructor() { }

    public nextStep(): void {
        if (this.guideConfig.currentStep < this.guideConfig.steps.length) {
            this.guideConfig.currentStep++;
        } else {
            this.guideConfig.showing = false;
        }
    }

    public startGuide(): void {
        this.guideConfig.showing = true;
        this.guideConfig.currentStep = 0;
    }
}
