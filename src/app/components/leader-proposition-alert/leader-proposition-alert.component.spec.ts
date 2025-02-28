import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaderPropositionAlertComponent } from './leader-proposition-alert.component';

describe('LeaderPropositionAlertComponent', () => {
  let component: LeaderPropositionAlertComponent;
  let fixture: ComponentFixture<LeaderPropositionAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeaderPropositionAlertComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeaderPropositionAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
