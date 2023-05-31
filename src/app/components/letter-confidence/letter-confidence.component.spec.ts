import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LetterConfidenceComponent } from './letter-confidence.component';

describe('LetterConfidenceComponent', () => {
    let component: LetterConfidenceComponent;
    let fixture: ComponentFixture<LetterConfidenceComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [LetterConfidenceComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(LetterConfidenceComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
