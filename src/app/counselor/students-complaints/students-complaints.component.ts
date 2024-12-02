import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CourseDTO } from 'src/app/dto/CourseDTO';
import { StudentComplaintsDTO } from 'src/app/dto/StudentComplaintsDTO';
import { CourseServiceService } from 'src/app/services/course-service.service';
import { DataServiceService } from 'src/app/services/data-service.service';
import { UsersResponseService } from 'src/app/services/users-response.service';

@Component({
  selector: 'app-students-complaints',
  templateUrl: './students-complaints.component.html',
  styleUrls: ['./students-complaints.component.scss']
})
export class StudentsComplaintsComponent implements OnInit {
  public courses: CourseDTO[] = [];
  public courseName: string = "";
  public complaintStatus: string = "";
  public complaints: StudentComplaintsDTO[] = [];
  public filteredComplaints: StudentComplaintsDTO[] = [];

  public pageSize: number = 10;
  public currentPage: number = 1;
  public totalItems: number = 0;
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();

  public selectedComplaint: StudentComplaintsDTO = {
    complaintId: 0,
    studentName: '',
    studentPhoneNumber: 0,
    complaintTxt: '',
    complaintStatus: '',
    supportTeamResp:'',
    createdDate: 0,
    createdBy: '',
    updatedDate: 0,
    updatedBy: '',
    batchCode: ''
  };

  constructor(
    private usersResponseService: UsersResponseService,
    private courseService: CourseServiceService,
    private router: Router,
    private dataService: DataServiceService

  ) { }

  @ViewChild('myModal') myModal!: ElementRef;

  ngOnInit(): void {
    this.getAllCourses();
    this.getAllStudentComplaints();
  }


  openModal(complaint: any): void {
    this.selectedComplaint = {
      ...complaint,

    };
    const modalElement = document.querySelector('.modal') as HTMLElement;
    modalElement.style.display = 'block';
    modalElement.classList.add('show');
  }
  closeModal(): void {
    const modalElement = this.myModal.nativeElement;
    modalElement.style.display = 'none';
    modalElement.classList.remove('show');
  }
  updateLeadStatus() {
    this.usersResponseService.updateStudentComplaintStatus(this.selectedComplaint.complaintId, this.selectedComplaint.complaintStatus).subscribe((res) => {
      this.closeModal();
      this.getAllStudentComplaints();
    });
  }



  getCourseName(courseId: number): string {
    const foundCourse = this.courses.find(course => course.courseId === courseId);
    return foundCourse ? foundCourse.courseName : 'Unknown';
  }
  getAllCourses() {
    this.courseService.getAllCourses().subscribe(
      res => {
        this.courses = res.data;
      },
      error => {

      }
    );
  }

  getAllStudentComplaints() {
    this.usersResponseService.getAllStudentsComplaints().subscribe(
      res => {
        this.complaints = res.data;
        this.filteredComplaints = this.complaints;
      },
      error => {

      }
    );
  }
  applyFilters() {
    this.filteredComplaints = this.complaints.filter(complaint =>
      complaint.complaintStatus.toLowerCase().includes(this.complaintStatus.toLowerCase())
    );
    this.calculateTotalPages();
  }


  updateStudentComplaintStatus(complaintId: number, complaintStatus: string) {
    if (complaintStatus === 'Active') {
      complaintStatus = 'Inactive';
    } else {
      complaintStatus = 'Active';
    }
    this.usersResponseService.updateStudentComplaintStatus(complaintId, complaintStatus).subscribe((res) => {
      this.getAllStudentComplaints();

    });
  }

  calculateTotalPages() {
    if (this.filteredComplaints) {
      this.totalItems = this.filteredComplaints.length;
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
}







