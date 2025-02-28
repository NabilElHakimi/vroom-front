import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoutAlertComponentComponent } from './logout-alert-component.component';

describe('LogoutAlertComponentComponent', () => {
  let component: LogoutAlertComponentComponent;
  let fixture: ComponentFixture<LogoutAlertComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogoutAlertComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogoutAlertComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
