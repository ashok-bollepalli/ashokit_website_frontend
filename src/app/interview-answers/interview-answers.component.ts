import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { InterviewCategoryDTO } from '../dto/InterviewCategoryDTO';
import { DataLoaderService } from '../services/data-loader.service';
import { InterviewQuestionDTO } from '../dto/InterviewQuestionDTO';
import { DataServiceService } from '../services/data-service.service';
import { CourseDTO } from '../dto/CourseDTO';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { OTPDTO } from '../dto/OTPDTO';
import { CourseCategoryDTO } from '../dto/CourseCategoryDTO';
import { CountryCodeDTO } from '../dto/CountryCodeDTO';
import { DomSanitizer, Meta, SafeHtml, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-interview-answers',
  templateUrl: './interview-answers.component.html',
  styleUrls: ['./interview-answers.component.scss']
})
export class InterviewAnswersComponent implements OnInit {
  registrationForm: FormGroup = this.formBuilder.group({});
  public courseCategories: CourseCategoryDTO[] = [];
  interviewCategory!: InterviewCategoryDTO;
  courses: CourseDTO[] = [];
  public countryCodes: CountryCodeDTO[] = [];
  courseId: number = 1;
  reset: any;

  public slug: any;
  public title: any;

  public submitted = false;
  interviewQuestions: { question: string, answer: string, coverImage: string }[] = [];

  public selectedCourseRegistration: OTPDTO = {
    id: 0,
    email: '',
    mobileNumber: '',
    otp: '',
    otpStatus: '',
    emailStatus: ''
  }
  public otpNumber: any;

  public otpStatus!: string;



  constructor(private dataLoaderService: DataLoaderService,
    private dataService: DataServiceService,
    private courseService: DataLoaderService,
    private formBuilder: FormBuilder,
    private toaster: ToastrService,
    private meta: Meta, private titleService: Title,
    private router: Router,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer) {

  }
  @ViewChild('myModal') myModal!: ElementRef;
  ngOnInit(): void {

    //this.setMetaTags();

    // Extract the path parameter 'topic'
    this.route.paramMap.subscribe(params => {
      this.slug = params.get('slug') || '';
    
      this.getInterviewQuestionByCategorySlugName(this.slug);
      const rawInterviewQuestions = this.dataService.interviewQuestionDatas;
      this.interviewQuestions = rawInterviewQuestions.map(q => ({
        question: q.question,
        answer: q.answer,
        coverImage: q.coverImage
      }));
    });


    this.getAllCoursesForRegistration();
    this.getCourseCategories();
    this.getAllCountryCodes();
    this.registrationForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      whatsappNumber: ['', Validators.required, Validators.pattern('^\\d{10}$')],
      courseId: ['', Validators.required],
      courseCategoryId: ['', Validators.required],
      countryCode: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  get f() {
    return this.registrationForm.controls;
  }

  getInterviewCategoryBySlug(slug: any) {
    this.dataLoaderService.getInterviewCategoryBySlug(slug).subscribe(
      res => {
        this.interviewCategory = res.data;
        this.dataService.interviewCategoryData = res.data;
        this.title = res.data.name;
      },
      (error: any) => {
        console.error('Error fetching interview questions:', error);
      }
    );
  }

  getInterviewQuestionByCategorySlugName(slug: any) {
    this.dataLoaderService.getInterviewQuestionByCategorySlugName(slug).subscribe(
      res => {
        this.interviewQuestions = res.data;
        this.dataService.interviewQuestionDatas = res.data;
      },
      (error: any) => {
        console.error('Error fetching interview questions:', error);
      }
    );

    this.getInterviewCategoryBySlug(this.slug);
  }

  setMetaTags() {
    this.interviewCategory = this.dataService.interviewCategoryData;
    // Set the title
    this.titleService.setTitle(this.interviewCategory.metaTitle);

    // Set meta description
    this.meta.updateTag({ name: 'description', content: this.interviewCategory.metaDescription });

    // Set meta keywords
    this.meta.updateTag({ name: 'keywords', content: this.interviewCategory.description });
  }


  getAllCountryCodes() {
    this.dataLoaderService.getAllCountryCodes().subscribe(res => {
      this.countryCodes = res.data;
    })
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.registrationForm.invalid) {
      this.toaster.error('Please fill out all mandatory fields.', 'Error');
      return;
    }
    const enquiryData = this.registrationForm.value;
    this.dataLoaderService.addCourseRegistration(enquiryData).subscribe(
      res => {
        this.toaster.success('Registration successful!', 'Success');
        this.registrationForm.reset();
        this.selectedCourseRegistration = res.data;
        this.openModal();
      },
      error => {
        this.toaster.error('Failed to submit data.', 'Error');
      }
    );
  }
  getCourseCategories() {
    this.dataLoaderService.getCourseCategories().subscribe(
      res => {
        this.courseCategories = res.data;
      },
      error => {
        console.error('Error fetching course categories:', error);
      }
    );
  }
  getAllCoursesForRegistration() {
    this.dataLoaderService.getAllCoursesForRegistration().subscribe(
      res => {
        this.courses = res.data;
      },
      error => {
        console.error('Error fetching courses:', error);
      }
    );
  }

  getCourseName(courseId: number): string {
    const foundCourse = this.courses.find(course => course.courseId === courseId);
    return foundCourse ? foundCourse.courseName : 'Unknown';
  }


  findCourseByCategory(e: any) {
    this.courses = this.courses.filter(data => data.courseCategoryId == e.target.value);

  }
  closeModal(): void {
    const modalElement = this.myModal.nativeElement;
    modalElement.style.display = 'none';
    modalElement.classList.remove('show');
  }

  openModal(): void {
    const modalElement = document.querySelector('.modal') as HTMLElement;
    modalElement.style.display = 'block';
    modalElement.classList.add('show');
  }

  validateOtp(data: any) {
    this.dataLoaderService.verifyOTP(data.whatsappNumber, this.otpNumber).subscribe(
      res => {
        this.toaster.success("OTP Verified Successfully!")
        this.closeModal();
      },
      error => {
        this.toaster.error("OTP Not Verified Successfully!")
      }
    )
  }


  onInputChange(event: any) {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/[^0-9]/g, ''); // This line ensures only numeric characters are allowed
  }

}
