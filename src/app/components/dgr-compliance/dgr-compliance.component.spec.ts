import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DgrComplianceComponent } from './dgr-compliance.component';

describe('DgrComplianceComponent', () => {
  let component: DgrComplianceComponent;
  let fixture: ComponentFixture<DgrComplianceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DgrComplianceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DgrComplianceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
