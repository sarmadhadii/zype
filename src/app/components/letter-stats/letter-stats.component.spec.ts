import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LetterStatsComponent } from './letter-stats.component';

describe('LetterStatsComponent', () => {
  let component: LetterStatsComponent;
  let fixture: ComponentFixture<LetterStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LetterStatsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LetterStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
