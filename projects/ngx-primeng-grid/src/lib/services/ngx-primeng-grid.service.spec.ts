import { TestBed } from '@angular/core/testing';

import { NgxPrimengGridService } from './ngx-primeng-grid.service';

describe('NgxPrimengGridService', () => {
  let service: NgxPrimengGridService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxPrimengGridService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
