import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationReservationsComponent } from './location-reservations.component';

describe('LocationReservationsComponent', () => {
  let component: LocationReservationsComponent;
  let fixture: ComponentFixture<LocationReservationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LocationReservationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocationReservationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
