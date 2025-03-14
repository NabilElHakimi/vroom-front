import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateVehicleModalComponent } from './update-vehicle-modal.component';

describe('UpdateVehicleModalComponent', () => {
  let component: UpdateVehicleModalComponent;
  let fixture: ComponentFixture<UpdateVehicleModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateVehicleModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateVehicleModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
