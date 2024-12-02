import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventRegistrationSuccessComponent } from './event-registration-success.component';

describe('EventRegistrationSuccessComponent', () => {
  let component: EventRegistrationSuccessComponent;
  let fixture: ComponentFixture<EventRegistrationSuccessComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EventRegistrationSuccessComponent]
    });
    fixture = TestBed.createComponent(EventRegistrationSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
