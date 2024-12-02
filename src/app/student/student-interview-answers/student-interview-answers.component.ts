import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CourseDTO } from 'src/app/dto/CourseDTO';
import { InterviewCategoryDTO } from 'src/app/dto/InterviewCategoryDTO';
import { InterviewQuestionDTO } from 'src/app/dto/InterviewQuestionDTO';
import { CourseServiceService } from 'src/app/services/course-service.service';
import { DataLoaderService } from 'src/app/services/data-loader.service';
import { DataServiceService } from 'src/app/services/data-service.service';
import { InterviewQuestionService } from 'src/app/services/interview-question.service';


@Component({
  selector: 'app-student-interview-answers',
  templateUrl: './student-interview-answers.component.html',
  styleUrls: ['./student-interview-answers.component.scss']
})
export class StudentInterviewAnswersComponent  implements OnInit {
  registrationForm: FormGroup = this.formBuilder.group({});

  interviewCategory!:InterviewCategoryDTO;
  interviewQuestions : InterviewQuestionDTO[] = [];
  courses: CourseDTO[] = [];
  courseId: number=1;
  reset: any;
 
  constructor(
    private interviewQuestionService:InterviewQuestionService,
    private dataLoaderService:DataLoaderService,
    private dataService: DataServiceService, 
    private formBuilder: FormBuilder,
    private toastr: ToastrService) {

  }
  ngOnInit(): void {
  
    this.interviewCategory = this.dataService.interviewCategoryData;
    this.interviewQuestions = this.dataService.interviewQuestionDatas;


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
