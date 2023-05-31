import { Injectable } from '@angular/core';
import { IUser } from '../interfaces/user';
import { dummyUser, generateConfidences } from '../shared/utils';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    public user: IUser = {} as IUser;
    protected alphabets = 'etaoinsrhldcwypgvkbmzfuxjq';

    constructor() { }

    public getAllowedAlphabets(): string[] {
        const allowedAlphabets: string[] = [];
        for (let i = 0; i < this.alphabets.length; i++) {
            if (this.user!.analytics.letterConfidences[this.alphabets[i]].allowed) {
                allowedAlphabets.push(this.alphabets[i]);
            }
        }
        return allowedAlphabets;
    }

    /**
     * Checks user.analytics.letterConfidences and returns the letter with the lowest confidence
     * @returns the letter with the lowest confidence
     */
    public getWeakestAlphabet(): string {
        let weakestAlphabet = '';
        let lowestConfidence = 100;
        for (let i = 0; i < this.alphabets.length; i++) {
            if (this.user!.analytics.letterConfidences[this.alphabets[i]].attemptedAmount === 0 && this.user!.analytics.letterConfidences[this.alphabets[i]].allowed) {
                return this.alphabets[i];
            }
            const currentConfidencePercentage = (this.user!.analytics.letterConfidences[this.alphabets[i]].successfulAttempts / this.user!.analytics.letterConfidences[this.alphabets[i]].attemptedAmount) * 100;
            if (currentConfidencePercentage < lowestConfidence) {
                lowestConfidence = currentConfidencePercentage;
                weakestAlphabet = this.alphabets[i];
            }
        }
        return weakestAlphabet;
    }
}
