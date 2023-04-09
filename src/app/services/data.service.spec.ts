import { TestBed } from '@angular/core/testing';

import { DataService } from './data.service';
import { CollectionReference, Firestore } from 'firebase/firestore';

describe('DataService', () => {
    let service: DataService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                { provide: Firestore, useFactory: () => <CollectionReference>{}}
            ]
        });
        service = TestBed.inject(DataService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
