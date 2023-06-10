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
            if (this.user?.analytics?.letterConfidences?.[this.alphabets?.[i]]?.allowed) {
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
            if (this.user?.analytics?.letterConfidences?.[this.alphabets?.[i]]?.attemptedAmount === 0 && this.user?.analytics?.letterConfidences?.[this.alphabets?.[i]]?.allowed) {
                return this.alphabets[i];
            }
            const currentConfidencePercentage = (this.user?.analytics?.letterConfidences?.[this?.alphabets?.[i]]?.successfulAttempts / this.user?.analytics?.letterConfidences?.[this.alphabets?.[i]]?.attemptedAmount) * 100;
            if (currentConfidencePercentage < lowestConfidence) {
                lowestConfidence = currentConfidencePercentage;
                weakestAlphabet = this.alphabets?.[i];
            }
        }
        return weakestAlphabet;
    }

    /**
     * Loops over allowed alphabets of user and returns total progress required to unlocking next alphabet. Acheived this by adding up all the remaining attempts for each letter in the allowed alphabets + adding all the percentages of the letters in the allowed alphabets
     * @returns total progress required to unlocking next alphabet as a percentage
     */

    public getTotalProgress(): number {
        const allowedAlphabets = this.getAllowedAlphabets();
        const analyticsObj = this.user?.analytics?.letterConfidences;
        //Here we get the total required accuracy and total required attempts for the allowed alphabets
        const totalRequiredAccuracy = (allowedAlphabets.length * 75);
        const totalRequiredAttempts = (allowedAlphabets.length * 250);

        //Here we get the total remaining attempts and total remaining accuracy for the allowed alphabets
        const totalRemainingAccuracy = totalRequiredAccuracy - (allowedAlphabets.map(alphabet => {
            const letterConfidence = analyticsObj?.[alphabet];
            const alphabetPercentage = ((letterConfidence?.successfulAttempts / letterConfidence?.attemptedAmount) * 100) || 0;
            return Math.min(75, alphabetPercentage);
        }).reduce((a, b) => a + b, 0));
        const totalRemainingAttempts = allowedAlphabets.map(alphabet => {
            const letterConfidence = analyticsObj?.[alphabet];
            const alphabetRemainingAttempts = (letterConfidence?.attemptedAmount > 250) ? 0 : (250 - letterConfidence?.attemptedAmount) || 250;
            return alphabetRemainingAttempts;
        }).reduce((a, b) => a + b, 0);

        //Here we get the total progress required to unlock next alphabet. I'm also multiplying the total remaining accuracy by 4 because I want the accuracy to be weighted more than the attempts
        const totalProgressRequired = 100 - ((((totalRemainingAccuracy * 4) + totalRemainingAttempts) / ((totalRequiredAccuracy * 4) + totalRequiredAttempts)) * 100);
        return Math.floor(totalProgressRequired);
    }
}
