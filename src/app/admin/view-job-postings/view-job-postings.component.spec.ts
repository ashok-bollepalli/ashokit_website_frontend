import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewJobPostingsComponent } from './view-job-postings.component';

describe('ViewJobPostingsComponent', () => {
  let component: ViewJobPostingsComponent;
  let fixture: ComponentFixture<ViewJobPostingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewJobPostingsComponent]
    });
    fixture = TestBed.createComponent(ViewJobPostingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
