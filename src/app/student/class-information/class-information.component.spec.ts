import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassInformationComponent } from './class-information.component';

describe('ClassInformationComponent', () => {
  let component: ClassInformationComponent;
  let fixture: ComponentFixture<ClassInformationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClassInformationComponent]
    });
    fixture = TestBed.createComponent(ClassInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});