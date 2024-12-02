import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DataLoaderService } from '../services/data-loader.service';
import { CourseDTO } from '../dto/CourseDTO';
import { CourseCategoryDTO } from '../dto/CourseCategoryDTO';
import { OTPDTO } from '../dto/OTPDTO';
import { CountryCodeDTO } from '../dto/CountryCodeDTO';
import { TestimonialDTO } from '../dto/TestimonialDTO';
import { DataSharingService } from '../services/sharing/data-sharing.service';

@Component({
  selector: 'app-course-registration',
  templateUrl: './course-registration.component.html',
  styleUrls: ['./course-registration.component.scss'],
})
export class CourseRegistrationComponent implements OnInit {

  public courses: CourseDTO[] = [];
  public courseCategories: CourseCategoryDTO[] = [];
  public courseRegOTPForm: FormGroup;
  public countryCodes: CountryCodeDTO[] = [];
  chunkedTestimonials: TestimonialDTO[][] = [];
  public testimonials: TestimonialDTO[] = [];

  public submitted = false;

  courseRegistrationForm: FormGroup = this.formBuilder.group({});


  public selectedCourseRegistration: OTPDTO = {
    id: 0,
    email: '',
    mobileNumber: '',
    otp: '',
    otpStatus: '',
    emailStatus: '',
  };
  public otpNumber: any;

  public otpStatus!: string;
  showOtpValidateScreen: boolean = false;
  errorMessage: string | null = null;



  constructor(
    private formBuilder: FormBuilder,
    private toaster: ToastrService,
    private dataLoaderService: DataLoaderService,
    private dataSharingService: DataSharingService
  ) {
    this.courseRegistrationForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      courseCategoryId: ['', Validators.required],
      courseId: ['', Validators.required],
      countryCode: ['', Validators.required],
      mobilNumber: ['', Validators.required],
    });

    this.courseRegOTPForm = this.formBuilder.group({
      otp: ['', Validators.required],

    });
  }

  @ViewChild('myModal') myModal!: ElementRef;
  ngOnInit(): void {
    this.getAllCoursesForRegistration();
    this.getCourseCategories();
    this.getAllCountryCodes();
  }

  get f() {
    return this.courseRegistrationForm.controls;
  }

  scrollTo(identification: string) {
    this.dataSharingService.scrollTo(identification);
  }



  onSubmit() {
    this.submitted = true;

    if (this.courseRegistrationForm.invalid) {
      this.toaster.error('Please fill out all mandatory fields.', 'Error');
      return;
    }

    const enquiryData = this.courseRegistrationForm.value;
    this.dataLoaderService.addCourseRegistration(enquiryData).subscribe(
      res => {
        console.log(res.data);
        this.selectedCourseRegistration = res.data;
        if(this.selectedCourseRegistration.otpStatus == "Pending"){
          this.showOtpValidateScreen = true;
        }else if(this.selectedCourseRegistration.otpStatus == "Verified"){
          this.toaster.success('Thankyou for registration, our team will contact you soon..!!');
          this.courseRegistrationForm.reset();
        }
      },
      error => {
        this.toaster.error('Failed to submit data.', 'Error');
      }
    );
   
  }
  getAllCountryCodes() {
    this.dataLoaderService.getAllCountryCodes().subscribe((res) => {
      this.countryCodes = res.data;
    });
  }

  getAllCoursesForRegistration() {
    this.dataLoaderService.getAllCourses().subscribe(
      (res) => {
        this.courses = res.data;
      },
      (error) => {
        console.error('Error fetching courses:', error);
      }
    );
  }

  getCourseCategories() {
    this.dataLoaderService.getCourseCategories().subscribe(
      (res) => {
        this.courseCategories = res.data;
      },
      (error) => {
        console.error('Error fetching course categories:', error);
      }
    );
  }

  

  validateOtp() {
    const regFormData = this.courseRegistrationForm.value;
    const otpDTO = this.courseRegOTPForm.value;
    this.dataLoaderService
      .verifyOTP(regFormData.mobilNumber, otpDTO.otp)
      .subscribe(
        (res) => {
          if (res.data.otpStatus == 'Verified') {
            this.showOtpValidateScreen = false;
            this.toaster.success('Thankyou for registration, our team will contact you soon..!!');
          } else {
            this.toaster.error('OTP Verification Failed');
          }
        },
        (error) => {
          this.toaster.error('OTP Verification Failed');
        }
      );
  }

  findCourseByCategory(e: any) {
    this.courses = this.courses.filter(
      (data) => data.courseCategoryId == e.target.value
    );
  }
  onInputChange(event: any) {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/[^0-9]/g, ''); // This line ensures only numeric characters are allowed
  }
}
