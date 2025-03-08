import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LodaingComponentComponent } from './lodaing-component.component';

describe('LodaingComponentComponent', () => {
  let component: LodaingComponentComponent;
  let fixture: ComponentFixture<LodaingComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LodaingComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LodaingComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
