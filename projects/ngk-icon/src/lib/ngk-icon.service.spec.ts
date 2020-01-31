import { TestBed } from '@angular/core/testing';

import { NgkIconService } from './ngk-icon.service';

describe('NgkIconService', () => {
  let service: NgkIconService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgkIconService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
