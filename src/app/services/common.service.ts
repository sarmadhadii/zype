import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CommonService {

    public testInProgress$: BehaviorSubject<boolean> = new BehaviorSubject(false);

    constructor() { }

    public setTestInProgress(): void {
        this.testInProgress$.next(true);
    }

    public stopTest(): void {
        this.testInProgress$.next(false);
    }
}
