import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataLoaderService } from '../services/data-loader.service';

@Component({
  selector: 'app-mock-interviews',
  templateUrl: './mock-interviews.component.html',
  styleUrls: ['./mock-interviews.component.scss']
})
export class MockInterviewsComponent implements OnInit {

 
  mockInterviewFeeForm: FormGroup = this.formBuilder.group({});
  public submitted = false;

  constructor(private formBuilder: FormBuilder,
    private sanitizer: DomSanitizer,
    private dataLoaderService: DataLoaderService,
    private router: Router,
    private toaster: ToastrService) { }

    ngOnInit(): void {

      this.mockInterviewFeeForm = this.formBuilder.group({ 
        name:  ['', Validators.required],
        email: ['', Validators.required],
        phoneNumber: ['', Validators.required],
        experience: ['', Validators.required],
        fee: ['', Validators.required],
        domain: ['', Validators.required],
      });
      
    }

    get f() {
      return this.mockInterviewFeeForm.controls;
    }
    onSubmit():void{
      this.submitted = true;
     if( this.mockInterviewFeeForm.valid){
      const data = this.mockInterviewFeeForm.value;
      this.dataLoaderService.addMockInterviewFees(data).subscribe (res  => {
        this.toaster.success('Data Added Successfully');
      },
      error => {
        this.toaster.error('Data  Added UnSuccessfully');
      })
     }
    }
}
