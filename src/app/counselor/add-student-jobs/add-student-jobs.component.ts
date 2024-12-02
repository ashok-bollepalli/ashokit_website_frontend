import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { CourseDTO } from 'src/app/dto/CourseDTO';
import { StudentJobsDTO } from 'src/app/dto/StudentJobsDTO';
import { StudentJobsService } from 'src/app/services/student-jobs.service';

@Component({
  selector: 'app-add-student-jobs',
  templateUrl: './add-student-jobs.component.html',
  styleUrls: ['./add-student-jobs.component.scss']
})
export class AddStudentJobsComponent implements OnInit {
  studentJobsForm: FormGroup = this.formBuilder.group({});
  studentJobs: StudentJobsDTO[] = [];
  courses: CourseDTO[] = [];



  constructor(private studentJobsService: StudentJobsService,
    private formBuilder: FormBuilder,
    private router: Router,
    private sanitizer: DomSanitizer,
  ) { }

  sanitizeAboutCourseInput(htmlString: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(htmlString);

  }


  ngOnInit(): void {
    this.studentJobsForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      phone: ['', Validators.required],
      image: ['', Validators.required],
      exp: ['', Validators.required],
      salPackage: ['', Validators.required],
      companyName: ['', Validators.required],
      courseId:['', Validators.required]
    });
    this.getAllCourses();
  }

  onSubmit(): void {
    if (this.studentJobsForm.valid) {
      const studentJobsData = this.studentJobsForm.value; // accessing form values
      this.studentJobsService.addStudentJobs(studentJobsData).subscribe(res => {
        this.router.navigate(['/counselor/student-jobs']);
      });
      console.log(studentJobsData);
    }
  }

  getAllCourses() {
    this.studentJobsService.getAllCourses().subscribe((res: any) => {
      this.courses = res.data;
    },
      (error) => {
        console.log('Error fetching courses:', error);
      }
    )
  }

}



