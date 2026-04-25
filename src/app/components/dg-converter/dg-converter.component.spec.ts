import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DgConverterComponent } from './dg-converter.component';

describe('DgConverterComponent', () => {
  let component: DgConverterComponent;
  let fixture: ComponentFixture<DgConverterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DgConverterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DgConverterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
