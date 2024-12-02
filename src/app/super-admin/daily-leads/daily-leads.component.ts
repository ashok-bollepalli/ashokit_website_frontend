import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CounsellorDTO } from 'src/app/dto/CounsellorDTO';
import { CourseCategoryDTO } from 'src/app/dto/CourseCategoryDTO';
import { DailyLeadDTO } from 'src/app/dto/DailyLeadDTO';
import { EnquiryDTO } from 'src/app/dto/EnquiryDTO';
import { StudentDTO } from 'src/app/dto/StudentDTO';
import { EnquiryService } from 'src/app/services/Enquiry/enquiry.service';
import { AddStudentEnrollmentService } from 'src/app/services/add_student-enrollment.service';
import { CounsellorService } from 'src/app/services/counsellor.service';
import { CourseCategoryService } from 'src/app/services/course-category.service';
import { CourseServiceService } from 'src/app/services/course-service.service';
import { EnquiriesService } from 'src/app/services/enquiries.service';
import { UsersResponseService } from 'src/app/services/users-response.service';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-daily-leads',
  templateUrl: './daily-leads.component.html',
  styleUrls: ['./daily-leads.component.scss']
})

export class DailyLeadsComponent implements OnInit {
  public dailyLeads: EnquiryDTO[] = [];
  public filteredDailyLeads: EnquiryDTO[] = [];
  public courses: any[] = [];
  public students: StudentDTO[] = [];
  public courseCategories: CourseCategoryDTO[] = [];
  public counsellors: CounsellorDTO[] = [];
  public searchQuery: string = '';
  public leadStatus: string = '';
  public courseName: string = '';
  public courseId: number = 1;
  public courseCategoryId: number = 1;
  public pageSize: number = 25;
  public currentPage: number = 1;
  public totalItems: number = 0;
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();
  public selectedDailyLead: EnquiryDTO = {
    id: 0,
    fullName: '',
    webinarName: '',
    email: '',
    mobilNumber: 0,
    wtCountryCode:0,
    whatsappNumber: 0,
    message: '',
    comment: '',
    city: '',
    trainingMode: '',
    remark: '',
    status: 'Open',
    paymentStatus: '',
    categoryId: 0,
    counsellorId: 0,
    trainerId: 0,
    courseId: 0,
    createdAt: 0,
    createdBy: '',
    updatedAt: 0,
    updatedBy: '',
    courseCategoryId: 0,
    enqSource: '',
  };
  public comment!:string;
  
  constructor(private router: Router,
    private usersResponseService: UsersResponseService,
    private courseService: CourseServiceService,
    private addStudentEnrollmentService: AddStudentEnrollmentService,
    private courseCategoryService: CourseCategoryService,
    private enquiryService: EnquiryService,
    private counsellorService: CounsellorService) { }
    
    @ViewChild('myModal') myModal!: ElementRef;

  ngOnInit(): void {
    this.getAllDailyLeads();
    this.getAllCourses();
    this.getAllStudents();
    this.getCourseCategories();
    this.getAllCounsellors();
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
  getAllStudents() {
    this.addStudentEnrollmentService.getAllStudents().subscribe(
      res => {
        this.students = res.data;

      },
      error => {
      }
    );
  }
  getCourseCategories() {
    this.courseCategoryService.getCourseCategories().subscribe(
      res => {
        this.courseCategories = res.data;
      },
      error => {

      }
    );
  }
  getAllCounsellors() {
    this.counsellorService.getAllCounsellors().subscribe(
      res => {
        this.counsellors = res.data
      },
      error => {

      }
    );

  }
  getAllDailyLeads() {
    this.enquiryService.getAllEnquiries().subscribe(
      res => {
        this.dailyLeads = res.data;
        this.filteredDailyLeads = res.data;
      },
      error => {
        console.log('error1', error)
      }
    )
  }

  getAllDailyLeadsWithFilter() {
    this.enquiryService.getEnquriesWithFilter(this.selectedDailyLead).subscribe(
      res => {
        this.dailyLeads = res.data;
        this.filteredDailyLeads = res.data;
      },
      error => {
      }
    );
    this.calculateTotalPages();
  }


  getCourseName(courseId: number): string {
    const foundCourse = this.courses.find(course => course.courseId === courseId);
    return foundCourse ? foundCourse.courseName : 'Unknown';
  }
  getCourseCategoryName(categoryId: number): string {
    const foundCategory = this.courseCategories.find(category => category.courseCategoryId === categoryId);
    return foundCategory ? foundCategory.courseCategoryName : 'Unknown';
  }
  getCounsellorName(counsellorId: number): string {
    const foundCounsellor = this.counsellors.find(counsellor => counsellor.counsellorId === counsellorId);
    return foundCounsellor ? foundCounsellor.counsellorName : 'Unknown';
  }


  applyFilters() {

    this.filteredDailyLeads = this.dailyLeads.filter((dailyLead: EnquiryDTO) => {
      const matchedCourseId = dailyLead.courseId == this.courseId;
      const matchedCourseCategoryId = dailyLead.categoryId == this.courseCategoryId;
      const matchedMobileNumber = dailyLead.mobilNumber.toString().trim() == this.searchQuery.toLowerCase().trim();
      const matchedLeadStatus = dailyLead.status.toLowerCase().trim() == this.leadStatus.toLowerCase().trim();

      return matchedCourseId && matchedCourseCategoryId && matchedMobileNumber && matchedLeadStatus;
    });


    this.calculateTotalPages();
  }

  calculateTotalPages() {
    if (this.filteredDailyLeads) {
      this.totalItems = this.filteredDailyLeads.length;
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

  generateExcel() {
    const excelContent = this.constructExcelContent();
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(excelContent);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'DailyLead');
    XLSX.writeFile(wb, 'dailyLeads.xlsx');
  }

  private constructExcelContent(): any[] {
    return this.dailyLeads.map(DailyLead => ({
      'Id': DailyLead.id,
      'Name': DailyLead.fullName,
      'Email': DailyLead.email,
      'Phone Number': DailyLead.mobilNumber,
      'TrainingMode': DailyLead.trainingMode,
      'Message': DailyLead.message,
      'Comment': DailyLead.comment,
      'Created At': DailyLead.createdAt,
      'CounsellorId': DailyLead.counsellorId,
      'CourseCategoryId': DailyLead.categoryId,
      'CourseId': DailyLead.courseId,
      'Lead Status': DailyLead.status
    }));
  }
  closeModal(): void {
    const modalElement = this.myModal.nativeElement;
    modalElement.style.display = 'none';
    modalElement.classList.remove('show');
  }
  openModal(enquiry:any): void {
    this.selectedDailyLead = {
      ...enquiry,
       comment: '', 
    };
    const modalElement = document.querySelector('.modal') as HTMLElement;
    modalElement.style.display = 'block';
    modalElement.classList.add('show');
  }

  updateLeadStatus(){
    this.usersResponseService.updateDailyLeadStatusAndComment( this.selectedDailyLead.id,
        this.selectedDailyLead.status,
      this.selectedDailyLead.comment).subscribe((res) => {
      this.closeModal();
      this.getAllDailyLeads();
    });
  }

}
