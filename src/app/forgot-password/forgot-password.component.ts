import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataLoaderService } from '../services/data-loader.service';
import { ToastrService } from 'ngx-toastr';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  email: any;
  public submitted = false;

  errorMessage: string | null = null;
  successMsg: string | null = null;
  isLoading: boolean = false;

  forgotPassword: FormGroup = this.formBuilder.group({});

  constructor(private dataLoaderService: DataLoaderService,
    private toaster: ToastrService,
    private formBuilder: FormBuilder,
    private meta: Meta, private titleService: Title
  ) { }

  ngOnInit(): void {
    this.setMetaTags();
    this.forgotPassword = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });

  }


  setMetaTags() {
    // Set the title
    this.titleService.setTitle('Ashok IT | Forgot Password');

    // Set meta description
    this.meta.updateTag({ name: 'description', content: 'Discover the best software training institute in Hyderabad at Ashok IT. Offering comprehensive courses in Java, Python, AWS, DevOps, and more. Get industry-ready with hands-on training and expert guidance.' });

    // Set meta keywords
    this.meta.updateTag({ name: 'keywords', content: 'Best Software Training Institute, Hyderabad, IT Courses, Full Stack Development, Java, Python, AWS, DevOps, Ashok IT' });
  }


  get f() {
    return this.forgotPassword.controls;
  }
  onSubmit() {
    
    this.errorMessage = '';
    this.submitted = true;
    if (this.forgotPassword.invalid) {
      this.toaster.error('Please fill out all mandatory fields.', 'Error');
      return;
    }
    this.isLoading = true;
    this.dataLoaderService.forgotPassword(this.email).subscribe((res: any) => {
      this.isLoading = false;
      this.email = '';
      // this.toaster.success('Data Added Successfully');
      this.forgotPassword.reset();
      this.successMsg = 'Reset Password Link Sent to Your Registered Email';
    },
      (error: any) => {
        this.isLoading = false;
        this.errorMessage = 'No Record Found With Given Email !';
      }
    )
  }

  closeErrorMessage() {
    this.errorMessage = null;
  }


}