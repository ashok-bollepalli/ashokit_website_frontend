import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CourseDTO } from 'src/app/dto/CourseDTO';
import { StudentComplaintsDTO } from 'src/app/dto/StudentComplaintsDTO';
import { CourseServiceService } from 'src/app/services/course-service.service';
import { UsersResponseService } from 'src/app/services/users-response.service';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-student-complaints',
  templateUrl: './student-complaints.component.html',
  styleUrls: ['./student-complaints.component.scss']
})
export class StudentComplaintsComponent implements OnInit {
  public filteredComplaints: StudentComplaintsDTO[] = [];
  public complaints: StudentComplaintsDTO[] = [];
  studentPhoneNumber: string = '';
  complaintStatus:string ='';
  courseName:string ='';
  public pageSize: number = 5;
  public currentPage: number = 1;
  public totalItems: number = 0;
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();
  public courses: any[] = [];
  public courseId: any;
  
  constructor(private router: Router,
    private usersResponseService:UsersResponseService,
    private courseService:CourseServiceService
     ){}


    ngOnInit(): void {
      this.getAllStudentsComplaints();
      this. getAllCourses();
    }
    
    getAllCourses() {
      this.courseService.getAllCourses().subscribe(
        (res: { data: any; }) => {
          this.courses = res.data;
        },
        () => {
        }
      );
    }
    getCourseName(courseId: number): string {
      const foundCourse = this.courses.find(course => course.courseId === courseId);
      return foundCourse ? foundCourse.courseName : 'Unknown';
    }
    
    getAllStudentsComplaints() {
      this.usersResponseService.getAllStudentsComplaints().subscribe(
        res => {
          this.complaints = res.data;
          this.filteredComplaints = res.data;
        },
        (error: any) => {
          console.error('Error fetching complaints:', error);
        }
      );
    }
    applyFilters() {
      this.filteredComplaints = this.complaints.filter((complaint: StudentComplaintsDTO) => {    
        const  matchedStudentPhoneNumber  = complaint.studentPhoneNumber ? complaint.studentPhoneNumber.toString().trim() : "";
        const matchedComplaintStatus = complaint.complaintStatus.toLowerCase().trim() == this.complaintStatus.toLowerCase().trim();
        return matchedStudentPhoneNumber || matchedComplaintStatus ;
    });
    
      this.calculateTotalPages();
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
  
   /* generateExcel() {
      const excelContent = this.constructExcelContent();
      const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(excelContent);
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Complaints');
      XLSX.writeFile(wb, 'complaints.xlsx');
    }
    
    private constructExcelContent(): any[] {
      return this.complaints.map(Complaints => ({
        'Id': Complaints.complaintId,
        'Name': Complaints.studentName,
      
        'Phone Number':Complaints.studentPhoneNumber,
      
        'Message':Complaints.message,
      
        'Created At': Complaints.createdDate,
        'Status': Complaints.complaintStatus,
        'Whatsapp': Complaints.whatsapp
      }));
    }*/

    deleteStudentComplaint(studentComplaintId: number) {
      this.usersResponseService.deleteStudentComplaint(studentComplaintId).subscribe((res) => {
        this.getAllStudentsComplaints();
        this.applyFilters();
      });
    }
  }
  
  
  


