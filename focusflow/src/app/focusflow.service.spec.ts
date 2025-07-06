import { TestBed } from '@angular/core/testing';

import { FocusflowService } from './focusflow.service';

describe('FocusflowService', () => {
  let service: FocusflowService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FocusflowService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
