import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEnrollmentsComponent } from './view-enrollments.component';

describe('ViewEnrollmentsComponent', () => {
  let component: ViewEnrollmentsComponent;
  let fixture: ComponentFixture<ViewEnrollmentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewEnrollmentsComponent]
    });
    fixture = TestBed.createComponent(ViewEnrollmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
