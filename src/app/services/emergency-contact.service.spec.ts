import { TestBed } from '@angular/core/testing';

import { EmergencyContactService } from './emergency-contact.service';

describe('EmergencyContactService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EmergencyContactService = TestBed.get(EmergencyContactService);
    expect(service).toBeTruthy();
  });
});
