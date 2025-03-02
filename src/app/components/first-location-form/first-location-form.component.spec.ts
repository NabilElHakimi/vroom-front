import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstLocationFormComponent } from './first-location-form.component';

describe('FirstLocationFormComponent', () => {
  let component: FirstLocationFormComponent;
  let fixture: ComponentFixture<FirstLocationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FirstLocationFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FirstLocationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
