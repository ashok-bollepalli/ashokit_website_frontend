import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CourseDTO } from 'src/app/dto/CourseDTO';
import { InterviewCategoryDTO } from 'src/app/dto/InterviewCategoryDTO';
import { InterviewQuestionDTO } from 'src/app/dto/InterviewQuestionDTO';
import { CourseServiceService } from 'src/app/services/course-service.service';
import { DataLoaderService } from 'src/app/services/data-loader.service';

import { DataServiceService } from 'src/app/services/data-service.service';
import { InterviewQuestionService } from 'src/app/services/interview-question.service';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-student-interview-questions',
  templateUrl: './student-interview-questions.component.html',
  styleUrls: ['./student-interview-questions.component.scss']
})
export class StudentInterviewQuestionsComponent implements OnInit {
  registrationForm: FormGroup = this.formBuilder.group({});

  interviewCategories: InterviewCategoryDTO[] = [];
  interviewQuestions: InterviewQuestionDTO[] = [];
  courses: CourseDTO[] = [];
  courseId: number=1;
  reset: any;


  constructor(private dataLoaderService:DataLoaderService,
    private courseService:CourseServiceService,
    private dataService: DataServiceService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getAllInterviewCategory();
    this.getAllCourses();
    //this.getInterviewQuestionByCategory(this.interviewCategories[0]);
    this.registrationForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      courseId: ['', Validators.required],
      msg: ['']
    });
  
  }

  getAllInterviewCategory() {
    this.dataLoaderService.getAllInterviewCategory().subscribe(res => {
      this.interviewCategories = res.data;
    },
      (error: any) => {
        console.error('Error fetching courses:', error);
      }
    );
  }

  getInterviewQuestionByCategory(interviewCategory: any) {
    console.log(interviewCategory)
    this.dataService.interviewCategoryData = interviewCategory;
    this.dataLoaderService.getInterviewQuestionByCategory(interviewCategory.categoryId).subscribe(
      res => {
        this.interviewQuestions = res.data;
        this.dataService.interviewQuestionDatas = res.data;
        this.router.navigate(['/student/student-interview-answers']);
      },
      (error: any) => {
        console.error('Error fetching interview questions:', error);
      }
    );
  }
  
  onSubmit(): void {
    if (this.registrationForm.valid) {
      const registeredData = this.registrationForm.value;
      this.dataLoaderService.createDailyLeads(registeredData).subscribe(res => {
        this.toastr.success('Registration successful!', 'Success');
        this.registrationForm.reset();
      })
    }

  }

  getAllCourses() {
    this.dataLoaderService.getAllCourses().subscribe(
      res => {
        this.courses = res.data;
      },
      error => {
      }
    );
  }
  getCourseName(courseId: number): string {
    const foundCourse = this.courses.find(course => course.courseId === courseId);
    return foundCourse ? foundCourse.courseName : 'Unknown';
  }

}