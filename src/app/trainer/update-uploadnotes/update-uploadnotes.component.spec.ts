import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateUploadnotesComponent } from './update-uploadnotes.component';

describe('UpdateUploadnotesComponent', () => {
  let component: UpdateUploadnotesComponent;
  let fixture: ComponentFixture<UpdateUploadnotesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateUploadnotesComponent]
    });
    fixture = TestBed.createComponent(UpdateUploadnotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
