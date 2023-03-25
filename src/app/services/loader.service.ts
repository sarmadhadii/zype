import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class LoaderService {

    public loading: boolean = false;

    constructor() { }

    public startLoading(): void {
        this.loading = true;
    }

    public endLoading(): void {
        this.loading = false;
    }
}
