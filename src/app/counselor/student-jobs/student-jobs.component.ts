import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CourseDTO } from 'src/app/dto/CourseDTO';
import { StudentJobsDTO } from 'src/app/dto/StudentJobsDTO';
import { CourseServiceService } from 'src/app/services/course-service.service';
import { DataServiceService } from 'src/app/services/data-service.service';
import { StudentJobsService } from 'src/app/services/student-jobs.service';
import { UsersResponseService } from 'src/app/services/users-response.service';

@Component({
  selector: 'app-student-jobs',
  templateUrl: './student-jobs.component.html',
  styleUrls: ['./student-jobs.component.scss'],
})
export class StudentJobsComponent implements OnInit {
  public filteredStudentJobs: StudentJobsDTO[] = [];
  public studentJobs: StudentJobsDTO[] = [];
  public courses: CourseDTO[] = [];
  public fullName: string = "";
  public courseId: number = 1;


  public pageSize: number = 5;
  public currentPage: number = 1;
  public totalItems: number = 0;
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();

  constructor(
    private studentJobsService: StudentJobsService,
    private usersResponseService: UsersResponseService,
    private router: Router,
    private courseService: CourseServiceService,
    private dataService: DataServiceService
  ) { }

  ngOnInit(): void {
    this.getAllStudentJobs();
    this.getAllCourses();
    // this.filter();
  }
  getAllCourses() {
    this.courseService.getAllCourses().subscribe(res => {
      this.courses = res.data;
      this.filteredStudentJobs = res.data;
      this.filter();
    });
  }

  addStudentJobs() {
    this.router.navigate(['/counselor/add-student-jobs']);
  }
  updateStudentJobsStatus(categoryId: number, status: string) {
    if (status === 'Active') {
      status = 'Inactive';
    } else {
      status = 'Active';
    }
  }

  filter() {
    this.filteredStudentJobs = this.studentJobs.filter(
      (studentJob: StudentJobsDTO) => {
        return studentJob.fullName
          .toLowerCase()
          .includes(this.fullName.toLowerCase());
      }
    );
  }

  getAllStudentJobs() {
    this.studentJobsService.getAllStudentsJobs().subscribe(
      (res) => {
        this.studentJobs = res.data;
        this.filteredStudentJobs = res.data;
        this.filter();
      },
      (error) => { }
    );
  }

  updateStudentJob(studentJob: StudentJobsDTO) {
    this.dataService.studentJobsData = studentJob;
    this.router.navigate(['/counselor/edit-student-jobs']);
  }
  calculateTotalPages() {
    if (this.filteredStudentJobs) {
      this.totalItems = this.filteredStudentJobs.length;
    } else {
      this.totalItems = 0;
    }
  }
  getTotalPages(): number {
    this.calculateTotalPages();
    return Math.ceil(this.totalItems / this.pageSize);
  }

  getPageArray(): number[] {
    const totalPages = this.getTotalPages();
    const maxVisiblePages = 5;
    const pages: number[] = [];

    let startPage = Math.max(1, this.currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  }

  onPageChange(page: number): void {
    if (page >= 1 && page <= this.getTotalPages()) {
      this.currentPage = page;
      this.pageChange.emit(this.currentPage);
    }
  }

  getCourseName(courseId: number): string {
    const foundCourse = this.courses.find(course => course.courseId === courseId);
    if (foundCourse) {
      console.log('Found course:', foundCourse);
      return foundCourse.courseName;
    }
    else {
      console.log('course not found for ID:', courseId);
      return 'Unknown';
    }
  }
  deleteStudentJob(studentJobsId: number) {
    this.studentJobsService.deleteStudentJob(studentJobsId).subscribe((res) => {
      this.getAllStudentJobs();
      this.filter();
    });
  }

}

