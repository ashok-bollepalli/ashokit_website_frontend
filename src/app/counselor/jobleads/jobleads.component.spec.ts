import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobleadsComponent } from './jobleads.component';

describe('JobleadsComponent', () => {
  let component: JobleadsComponent;
  let fixture: ComponentFixture<JobleadsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JobleadsComponent]
    });
    fixture = TestBed.createComponent(JobleadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
