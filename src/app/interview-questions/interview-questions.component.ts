import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DataLoaderService } from '../services/data-loader.service';
import { DataServiceService } from '../services/data-service.service';
import { Router } from '@angular/router';
import { InterviewCategoryDTO } from '../dto/InterviewCategoryDTO';
import { InterviewQuestionDTO } from '../dto/InterviewQuestionDTO';
import { CourseDTO } from '../dto/CourseDTO';
import { CourseCategoryDTO } from '../dto/CourseCategoryDTO';
import { OTPDTO } from '../dto/OTPDTO';
import { CountryCodeDTO } from '../dto/CountryCodeDTO';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-interview-questions',
  templateUrl: './interview-questions.component.html',
  styleUrls: ['./interview-questions.component.scss']
})
export class InterviewQuestionsComponent implements OnInit {
  public submitted = false;
  registrationForm: FormGroup = this.formBuilder.group({});
  public courseCategories: CourseCategoryDTO[] = [];
  interviewCategorySubjects: InterviewCategoryDTO[] = [];
  interviewCategories: InterviewCategoryDTO[] = [];
  filteredInterviewCategories: InterviewCategoryDTO[] = [];
  interviewQuestions: InterviewQuestionDTO[] = [];
  courses: CourseDTO[] = [];
  public countryCodes: CountryCodeDTO[] = [];

  public activeTab: string = 'All';

  public selectedCourseRegistration: OTPDTO = {
    id: 0,
    email: '',
    mobileNumber: '',
    otp: '',
    otpStatus: '',
    emailStatus: ''
  };
  public otpNumber: any;
  public otpStatus!: string;

  constructor(
    private dataLoaderService: DataLoaderService,
    private courseService: DataLoaderService,
    private dataService: DataServiceService,
    private router: Router,
    private formBuilder: FormBuilder,
    private meta: Meta, private titleService: Title,
    private toaster: ToastrService
  ) { }

  @ViewChild('myModal') myModal!: ElementRef;

  ngOnInit(): void {
    this.setMetaTags();
    this.getAllInterviewCategorySubjects();
    this.getAllInterviewCategory();
    this.getAllInterviewCategoriesBySubjects('All');
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

  setMetaTags() {
    // Set the title
    this.titleService.setTitle('Top Software Job Interview Questions & Answers | Expert Guide | Ashok IT');

    // Set meta description
    this.meta.updateTag({ name: 'description', content: 'Prepare for your software job interviews with our comprehensive guide on common questions and expert answers. Boost your chances of success with tips and insights tailored for tech professionals.' });

    // Set meta keywords
    this.meta.updateTag({ name: 'keywords', content: 'software job interview questions, software developer interview answers, tech interview preparation, programming interview tips, software engineering questions, coding interview practice' });
  }

  get f() {
    return this.registrationForm.controls;
  }



  getAllInterviewCategoriesBySubjects(subjectName: string) {
    if (subjectName === 'All') {
      this.selectTab('All');
      this.filteredInterviewCategories = this.interviewCategories;
    } else {
      this.filteredInterviewCategories = this.interviewCategories.filter(category => category.subjectName === subjectName);
      this.selectTab(subjectName);
    }
  }

  getAllInterviewCategory() {
    this.dataLoaderService.getAllInterviewCategory().subscribe(
      res => {
        this.interviewCategories = res.data;
      },
      (error: any) => {
        console.error('Error fetching courses:', error);
      }
    );
  }

  getAllInterviewCategorySubjects() {
    this.dataLoaderService.getAllInterviewCategorySubjects().subscribe(
      res => {
        this.interviewCategorySubjects = res.data;
      },
      (error: any) => {
        console.error('Error fetching interviewCategorySubjects:', error);
      }
    );
  }

  getAllCountryCodes() {
    this.dataLoaderService.getAllCountryCodes().subscribe(
      res => {
        this.countryCodes = res.data;
      }
    );
  }

  getInterviewQuestionByCategory(interviewCategory: any) {
    this.dataService.interviewCategoryData = interviewCategory;
    this.dataLoaderService.getInterviewQuestionByCategorySlugName(interviewCategory.slug).subscribe(
      res => {
        this.interviewQuestions = res.data;
        this.dataService.interviewQuestionDatas = res.data;
        this.router.navigate(['/interview-preparation/'+this.dataService.interviewCategoryData.slug]);
      },
      (error: any) => {
        console.error('Error fetching interview questions:', error);
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

  selectTab(tab: string) {
    this.activeTab = tab;
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
    this.dataLoaderService.verifyOTP(data.countryCode + data.whatsappNumber, this.otpNumber).subscribe(
      res => {
        this.toaster.success("OTP Verified Successfully!");
        this.closeModal();
      },
      error => {
        this.toaster.error("OTP Not Verified Successfully!");
      }
    );
  }
  onInputChange(event: any) {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/[^0-9]/g, ''); // This line ensures only numeric characters are allowed
  }
}
