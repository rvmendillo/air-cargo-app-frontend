import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JsonConverterComponent } from './json-converter.component';

describe('JsonConverterComponent', () => {
  let component: JsonConverterComponent;
  let fixture: ComponentFixture<JsonConverterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JsonConverterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JsonConverterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
