import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargoIqMilestonesComponent } from './cargo-iq-milestones.component';

describe('CargoIqMilestonesComponent', () => {
  let component: CargoIqMilestonesComponent;
  let fixture: ComponentFixture<CargoIqMilestonesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CargoIqMilestonesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CargoIqMilestonesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
