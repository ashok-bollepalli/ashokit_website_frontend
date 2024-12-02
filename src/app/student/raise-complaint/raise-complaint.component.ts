import { SocialUser } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CourseDTO } from 'src/app/dto/CourseDTO';
import { CourseServiceService } from 'src/app/services/course-service.service';
import { CoursePaymentService } from 'src/app/services/coursepayment/course-payment.service';
import { DataLoaderService } from 'src/app/services/data-loader.service';
import { StudentService } from 'src/app/services/student.service';
import { UserStorageService } from 'src/app/services/user-storage.service';

@Component({
  selector: 'app-raise-complaint',
  templateUrl: './raise-complaint.component.html',
  styleUrls: ['./raise-complaint.component.scss']
})
export class RaiseComplaintComponent implements OnInit {
  complaintForm: FormGroup = this.formBuilder.group({});
  courses: CourseDTO[] = [];
  socialUser!: SocialUser | null;
  studentEmail!: string | null;
  studentId!: string | null;
  selectedCourse!: any;
  reset: any;
  constructor(private courseService: CourseServiceService,
    private formBuilder: FormBuilder,
    private dataLoaderService: DataLoaderService,
    private coursePaymentService: CoursePaymentService,
    private userStorageService: UserStorageService,
    private toastr: ToastrService
  ) { }
  ngOnInit(): void {
    this.socialUser = this.userStorageService.getSocialUser();
    this.studentEmail = this.socialUser ? this.socialUser.email : null;
    if (!this.studentEmail) {
      this.studentEmail = this.userStorageService.getStudent().studentEmail;
      this.studentId = this.userStorageService.getStudent().studentId;
    }
    if (this.studentEmail) {
      this.coursePaymentService.getCoursesByStudentEmail(this.studentEmail).subscribe(res => {
        this.courses = res.data;
      });
    }
    this.complaintForm = this.formBuilder.group({
      batchCode: ['', Validators.required],
      id: [],
      complaintTxt: ['', Validators.required],
      studentEmail: [this.studentEmail],
      studentId: [this.studentId]
    })
  }

  onSubmit() {

    if (this.complaintForm.valid) {
      const studentComplaintsData = this.complaintForm.value;
      console.log(studentComplaintsData);
      this.dataLoaderService.createStudentComplaints(studentComplaintsData).subscribe((res: any) => {
        this.toastr.success('Complaint submitted successfully!', 'Success');
        this.complaintForm.reset();
      })
    }
  }

  getCourseName(courseId: number): string {
    const foundCourse = this.courses.find(course => course.courseId === courseId);
    this.selectedCourse = foundCourse;
    return foundCourse ? foundCourse.batchCode : 'Unknown';
  }


}
