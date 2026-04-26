import { TestBed } from '@angular/core/testing';

import { AwbService } from './awb.service';

describe('AwbService', () => {
  let service: AwbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AwbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
