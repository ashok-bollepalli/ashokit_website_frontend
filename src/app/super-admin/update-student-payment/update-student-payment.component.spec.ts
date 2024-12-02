import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateStudentPaymentComponent } from './update-student-payment.component';

describe('UpdateStudentPaymentComponent', () => {
  let component: UpdateStudentPaymentComponent;
  let fixture: ComponentFixture<UpdateStudentPaymentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateStudentPaymentComponent]
    });
    fixture = TestBed.createComponent(UpdateStudentPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
