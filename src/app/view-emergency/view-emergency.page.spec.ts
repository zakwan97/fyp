import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEmergencyPage } from './view-emergency.page';

describe('ViewEmergencyPage', () => {
  let component: ViewEmergencyPage;
  let fixture: ComponentFixture<ViewEmergencyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewEmergencyPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewEmergencyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
