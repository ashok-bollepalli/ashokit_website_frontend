import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobLeadsAdminComponent } from './job-leads-admin.component';

describe('JobLeadsAdminComponent', () => {
  let component: JobLeadsAdminComponent;
  let fixture: ComponentFixture<JobLeadsAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JobLeadsAdminComponent]
    });
    fixture = TestBed.createComponent(JobLeadsAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
