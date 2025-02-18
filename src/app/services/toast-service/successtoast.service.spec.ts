import { TestBed } from '@angular/core/testing';

import { SuccesstoastService } from './successtoast.service';

describe('SuccesstoastService', () => {
  let service: SuccesstoastService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SuccesstoastService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
