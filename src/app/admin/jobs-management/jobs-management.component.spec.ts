import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobsManagementComponent } from './jobs-management.component';

describe('JobsManagementComponent', () => {
  let component: JobsManagementComponent;
  let fixture: ComponentFixture<JobsManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JobsManagementComponent]
    });
    fixture = TestBed.createComponent(JobsManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
