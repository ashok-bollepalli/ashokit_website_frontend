import { SocialUser } from '@abacritt/angularx-social-login';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CourseDTO } from 'src/app/dto/CourseDTO';
import { StudentComplaintsDTO } from 'src/app/dto/StudentComplaintsDTO';
import { CourseServiceService } from 'src/app/services/course-service.service';
import { DataLoaderService } from 'src/app/services/data-loader.service';
import { DataServiceService } from 'src/app/services/data-service.service';
import { StudentComplaintsService } from 'src/app/services/student-complaints.service';
import { StudentService } from 'src/app/services/student.service';
import { UserStorageService } from 'src/app/services/user-storage.service';
import { StudentComplaintsComponent } from 'src/app/super-admin/student-complaints/student-complaints.component';

@Component({
  selector: 'app-previou-complaints',
  templateUrl: './previou-complaints.component.html',
  styleUrls: ['./previou-complaints.component.scss']
})
export class PreviouComplaintsComponent implements OnInit {

  filteredStudentComplaints: StudentComplaintsDTO[] = [];
  studentComplaints: StudentComplaintsDTO[] = [];
  courses: CourseDTO[] = [];
  selectedCourse!: any;

  public pageSize: number = 10;
  public currentPage: number = 1;
  public totalItems: number = 0;

  socialUser!: SocialUser | null;
  studentEmail!: string | null;
  studentId!: string | null;

  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();

  constructor(private router: Router,
    private studentService: StudentService,
    private dataLoaderService: DataLoaderService,
    private dataService: DataServiceService,
    private studentComplaintsService: StudentComplaintsService,
    private userStorageService: UserStorageService,
    private courseService: CourseServiceService) { }


  ngOnInit() {

    this.socialUser = this.userStorageService.getSocialUser();
    this.studentEmail = this.socialUser ? this.socialUser.email : null;
    if (!this.studentEmail) {
      this.studentEmail = this.userStorageService.getStudent().studentEmail;
      this.studentId = this.userStorageService.getStudent().studentId;
    }

    this.getAllStudentsComplaints(this.studentEmail!);
  }

  getAllStudentsComplaints(email: string) {
    this.dataLoaderService.getStudentComplaints(email).subscribe(
      res => {
        this.filteredStudentComplaints = res.data;
        this.studentComplaints = res.data
      },
      error => {
        console.error('Error fetching courses:', error);
      }
    );
  }


  calculateTotalPages() {
    if (this.filteredStudentComplaints) {
      this.totalItems = this.filteredStudentComplaints.length;
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

  updateStudentComplaintStatus(complaintId: number, complaintStatus: string) {
    if (complaintStatus === 'Active') {
      complaintStatus = 'Inactive';
    } else {
      complaintStatus = 'Active';
    }
    this.studentComplaintsService.updateStudentComplaintStatus(complaintId, complaintStatus).subscribe((res) => {
     // this.getAllStudentsComplaints();
    });
  }

}
