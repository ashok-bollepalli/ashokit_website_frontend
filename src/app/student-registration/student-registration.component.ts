import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataLoaderService } from '../services/data-loader.service';
import { ToastrService } from 'ngx-toastr';
import { StudentDTO } from '../dto/StudentDTO';
import { CountryCodeDTO } from '../dto/CountryCodeDTO';
import { OTPDTO } from '../dto/OTPDTO';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-student-registration',
  templateUrl: './student-registration.component.html',
  styleUrls: ['./student-registration.component.scss']
})
export class StudentRegistrationComponent implements OnInit {
  public students: StudentDTO[] = [];
  public countryCodes: CountryCodeDTO[] = [];
  public submitted = false;
  isLoading: boolean = false;

  studentRegistrationForm: FormGroup = this.formBuilder.group({});
  studentRegOtpForm: FormGroup = this.formBuilder.group({});

  public selectedStudentRegistration: OTPDTO = {
    id: 0,
    email: '',
    mobileNumber: '',
    otp: '',
    otpStatus: '',
    emailStatus: ''
  }
  public otpNumber: any;

  showOtpScreen: boolean = false;
  errorMessage: string | null = null;

  public otpStatus!: string;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private dataLoaderService: DataLoaderService,
    private meta: Meta, private titleService: Title,
    private toaster: ToastrService) {

    this.studentRegistrationForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      studentEmail: ['', Validators.required],
      gender: ['', Validators.required],
      countryCode: ['91', Validators.required],
      mobileNumber: ['', Validators.required]
    });

    this.studentRegOtpForm = this.formBuilder.group({
      otp: ['', Validators.required]
    });
  }
  @ViewChild('myModal') myModal!: ElementRef;

  ngOnInit(): void {
    this.setMetaTags();
   // this.getAllStudents();
    this.getAllCountryCodes();
  }

  setMetaTags() {
    // Set the title
    this.titleService.setTitle('Ashok IT | Fullstack Developer Course Registration');

    // Set meta description
    this.meta.updateTag({ name: 'description', content: 'Discover the best software training institute in Hyderabad at Ashok IT. Offering comprehensive courses in Java, Python, AWS, DevOps, and more. Get industry-ready with hands-on training and expert guidance.' });

    // Set meta keywords
    this.meta.updateTag({ name: 'keywords', content: 'Best Software Training Institute, Hyderabad, IT Courses, Full Stack Development, Java, Python, AWS, DevOps, Ashok IT' });
  }

  getAllStudents() {
    this.dataLoaderService.getAllStudents().subscribe(
      res => {
        this.students = res.data;
      },
      error => {
        console.error('Error fetching courses:', error);
      }
    );
  }

  getAllCountryCodes() {
    this.dataLoaderService.getAllCountryCodes().subscribe(res => {
      this.countryCodes = res.data;
    })
  }

  get f() {
    return this.studentRegistrationForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.studentRegistrationForm.valid) {
      this.isLoading= true;
      const studentData = this.studentRegistrationForm.value;
      this.dataLoaderService.addStudentRegistration(studentData).subscribe(res => {
        //this.studentRegistrationForm.reset();
        this.submitted = false; // Reset the submitted state after successful submission        
        console.log(res.data);
        this.selectedStudentRegistration = res.data;

        if (this.selectedStudentRegistration.emailStatus == 'Duplicate') {
          this.isLoading= false;
          this.errorMessage = 'Duplicate Email Entered';
        }

        if (this.selectedStudentRegistration.otpStatus == 'Pending') {
          this.errorMessage = '';
          this.showOtpScreen = true;
        } else if (this.selectedStudentRegistration.otpStatus == 'Verified') {
          this.isLoading= false;
          this.studentRegistrationForm.reset();          
          this.toaster.success('Registration Success, Please check your email for login credentials');
          this.router.navigate(['/registration-success']);
        }
      },
        error => {
          this.isLoading= false;
          this.toaster.error('Failed to submit data.', 'Error');
          this.errorMessage = 'Registration Failed';
        }
      );
    } else {
      this.toaster.error('Please fill out all mandatory fields.', 'Error');
    }
  }




  validateOtp() {
    this.errorMessage = '';
    if (this.studentRegOtpForm.valid) {
      this.isLoading= true;
      const studentData = this.studentRegistrationForm.value;
      const studentRegOTPData = this.studentRegOtpForm.value;
      console.log(studentData);
      this.dataLoaderService.verifyOTP(studentData.mobileNumber, studentRegOTPData.otp).subscribe(
        res => {
          this.isLoading= false;
          this.toaster.success("OTP Verified Successfully!");
          this.router.navigate(['/registration-success']);
        },
        error => {
          //this.toaster.error("OTP Verification Failed!");
          this.isLoading= false;
          this.errorMessage = 'OTP Verification Failed';
        }
      )
    } else {
      //this.toaster.error("Please Enter OTP");
      this.errorMessage = 'Please Enter OTP';
    }


  }

  onInputChange(event: any) {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/[^0-9]/g, ''); // This line ensures only numeric characters are allowed
  }

  closeErrorMessage() {
    this.errorMessage = null;
  }
}



