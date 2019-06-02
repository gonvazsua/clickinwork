import { TestBed } from '@angular/core/testing';

import { FichajesActionService } from './fichajes-action.service';

describe('FichajesActionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FichajesActionService = TestBed.get(FichajesActionService);
    expect(service).toBeTruthy();
  });
});
