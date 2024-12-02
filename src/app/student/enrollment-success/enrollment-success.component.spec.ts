import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrollmentSuccessComponent } from './enrollment-success.component';

describe('EnrollmentSuccessComponent', () => {
  let component: EnrollmentSuccessComponent;
  let fixture: ComponentFixture<EnrollmentSuccessComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EnrollmentSuccessComponent]
    });
    fixture = TestBed.createComponent(EnrollmentSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
