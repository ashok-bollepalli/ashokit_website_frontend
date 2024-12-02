import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsRegistrationsDataComponent } from './events-registrations-data.component';

describe('EventsRegistrationsDataComponent', () => {
  let component: EventsRegistrationsDataComponent;
  let fixture: ComponentFixture<EventsRegistrationsDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EventsRegistrationsDataComponent]
    });
    fixture = TestBed.createComponent(EventsRegistrationsDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
