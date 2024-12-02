import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CourseCategoryDTO } from 'src/app/dto/CourseCategoryDTO';
import { CourseDTO } from 'src/app/dto/CourseDTO';
import { EnquiryDTO } from 'src/app/dto/EnquiryDTO';
import { StudentDTO } from 'src/app/dto/StudentDTO';
import { TrainerDTO } from 'src/app/dto/TrainerDTO';
import { EnquiryService } from 'src/app/services/Enquiry/enquiry.service';
import { AddStudentEnrollmentService } from 'src/app/services/add_student-enrollment.service';
import { CourseCategoryService } from 'src/app/services/course-category.service';
import { CourseServiceService } from 'src/app/services/course-service.service';
import { DataServiceService } from 'src/app/services/data-service.service';
import { TrainerService } from 'src/app/services/trainer.service';
import { UsersResponseService } from 'src/app/services/users-response.service';


@Component({
  selector: 'app-view-students',
  templateUrl: './view-students.component.html',
  styleUrls: ['./view-students.component.scss']
})
export class ViewStudentsComponent implements OnInit{

  public studentPayment: StudentDTO[] = [];
  public students: StudentDTO[] = [];
  public filteredStudents: StudentDTO[] = [];
  public studentName: string = '';
  public studentEmail: string = '';

  public pageSize: number = 15;
  public currentPage: number = 1;
  public totalItems: number = 0;
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();


  constructor(
    private router: Router,
    private addStudentEnrollmentService: AddStudentEnrollmentService,
    private dataService: DataServiceService

  ) { }

  ngOnInit() {
    this.getAllStudents();
  }

  filter() {
    this.filteredStudents = this.filteredStudents.filter((student: StudentDTO) => {
      const email = student.studentEmail || ''; // Ensure it's a string
      const searchEmail = this.studentEmail?.trim().toLowerCase() || ''; // Ensure it's a string
      return email.toLowerCase().includes(searchEmail);
    }
    );
    this.calculateTotalPages();
  }

  addStudentEnrollment() {
    this.router.navigate(['/super-admin/add-student-enrollment']);
  }

  updateStudent(student: StudentDTO) {
    this.dataService.studentData = student;
    this.router.navigate(['/super-admin/update-student']);
  }

  getAllStudents() {
    this.addStudentEnrollmentService.getAllStudents().subscribe(
      res => {
        this.students = res.data;
        this.filteredStudents = res.data;
      },
      error => {
        console.error('Error fetching courses:', error);
      }
    );
    this.calculateTotalPages();
  }

  calculateTotalPages() {
    if (this.filteredStudents) {
      this.totalItems = this.filteredStudents.length;
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

  addExistingStudentToNewBatch(student: StudentDTO) {
    this.router.navigate(['/super-admin/add-existing-student-to-new-batch', student.studentId]);
  }

}