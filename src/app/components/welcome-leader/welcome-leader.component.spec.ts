import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeLeaderComponent } from './welcome-leader.component';

describe('WelcomeLeaderComponent', () => {
  let component: WelcomeLeaderComponent;
  let fixture: ComponentFixture<WelcomeLeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WelcomeLeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WelcomeLeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
