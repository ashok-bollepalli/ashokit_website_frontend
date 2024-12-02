import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatJobPostingComponent } from './update-job-posting.component';

describe('UpdatJobPostingComponent', () => {
  let component: UpdatJobPostingComponent;
  let fixture: ComponentFixture<UpdatJobPostingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdatJobPostingComponent]
    });
    fixture = TestBed.createComponent(UpdatJobPostingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
