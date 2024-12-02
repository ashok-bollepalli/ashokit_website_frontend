import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CourseServiceService } from 'src/app/services/course-service.service';
import { StudentService } from 'src/app/services/student.service';
import { UserStorageService } from 'src/app/services/user-storage.service';


@Component({
   selector: 'app-super-admin-home',
   templateUrl: './super-admin-home.component.html',
   styleUrls: ['./super-admin-home.component.scss']
})
export class SuperAdminHomeComponent implements OnInit {
   public todaysStudentCount: number = 0;
   public coursesCount: number = 0;
   public studentTotal: number = 0;


   constructor(private userStorageService: UserStorageService,
      private courseService: CourseServiceService,
      private studentService: StudentService,
      private router: Router
   ) { }

   ngOnInit(): void {
      this.courseService.getCoursesCount().subscribe(res => {
         this.coursesCount = res;
      });

      this.studentService.getTotalStudents().subscribe(res => {
         this.studentTotal = res;
      });
      this.studentService.getTotalRegisteredStudents().subscribe(res => {
         this.todaysStudentCount = res;
      })
   }

}
