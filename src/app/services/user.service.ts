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
}
