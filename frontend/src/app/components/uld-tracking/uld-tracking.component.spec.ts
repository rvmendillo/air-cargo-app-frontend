import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UldTrackingComponent } from './uld-tracking.component';

describe('UldTrackingComponent', () => {
  let component: UldTrackingComponent;
  let fixture: ComponentFixture<UldTrackingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UldTrackingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UldTrackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
