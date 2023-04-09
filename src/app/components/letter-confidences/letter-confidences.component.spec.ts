import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LetterConfidencesComponent } from './letter-confidences.component';

describe('LetterConfidencesComponent', () => {
  let component: LetterConfidencesComponent;
  let fixture: ComponentFixture<LetterConfidencesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LetterConfidencesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LetterConfidencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
