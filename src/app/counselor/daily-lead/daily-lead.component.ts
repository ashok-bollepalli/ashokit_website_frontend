import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { CounsellorDTO } from 'src/app/dto/CounsellorDTO';
import { CourseCategoryDTO } from 'src/app/dto/CourseCategoryDTO';
import { CourseDTO } from 'src/app/dto/CourseDTO';
import { DailyLeadDTO } from 'src/app/dto/DailyLeadDTO';
import { EnquiryDTO } from 'src/app/dto/EnquiryDTO';
import { EnquiryService } from 'src/app/services/Enquiry/enquiry.service';
import { CounsellorService } from 'src/app/services/counsellor.service';
import { CourseCategoryService } from 'src/app/services/course-category.service';
import { CourseServiceService } from 'src/app/services/course-service.service';
import { UsersResponseService } from 'src/app/services/users-response.service';

@Component({
  selector: 'app-daily-lead',
  templateUrl: './daily-lead.component.html',
  styleUrls: ['./daily-lead.component.scss']
})
export class DailyLeadComponent implements OnInit {

  public courses: CourseDTO[] = [];
  public filteredCourses: CourseDTO[] = [];
  public courseCategories: CourseCategoryDTO[] = [];
  public dailyLeads: EnquiryDTO[] = [];
  public counsellors: CounsellorDTO[] = [];
  public fullName: string = '';
  public status: string = '';
  public counsellorId: number = 1;
  public courseId: number = 1;
  public courseCategoryId: number = 1;

  public pageSize: number = 10;
  public currentPage: number = 1;
  public totalItems: number = 0;
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();

  filteredDailyLeads: EnquiryDTO[] = [];

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
    status: '',
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
    enqSource: ''
  };

  public comment!: string;

  constructor(
    private courseService: CourseServiceService,
    private enquiryService: EnquiryService,
    private courseCategoryService: CourseCategoryService,
    private counsellorService: CounsellorService,
    private usersResponseService: UsersResponseService) { }

  @ViewChild('myModal') myModal!: ElementRef;

  ngOnInit(): void {
    this.getAllCourses();
    this.getAllDailyLeads();
    this.getCourseCategories();
    this.getAllCounsellors();
  }

  closeModal(): void {
    const modalElement = this.myModal.nativeElement;
    modalElement.style.display = 'none';
    modalElement.classList.remove('show');
  }
  openModal(enquiry: any): void {
    this.selectedDailyLead = {
      ...enquiry,
      comments: '',
    };
    const modalElement = document.querySelector('.modal') as HTMLElement;
    modalElement.style.display = 'block';
    modalElement.classList.add('show');
  }

  updateLeadStatus() {
    this.usersResponseService.updateDailyLeadStatus(this.selectedDailyLead.id, this.selectedDailyLead.status, this.selectedDailyLead.comment).subscribe((res) => {
      this.closeModal();
      //this.getAllDailyLeads();
      //this.getAllDailyLeadsWithFilter();
    });
  }

  filter() {
    this.filteredDailyLeads = this.dailyLeads.filter((dailyLeads: EnquiryDTO) => {
      const matchedCourseId = dailyLeads.courseId == this.courseId;
      const matchedCourseCategoryId = dailyLeads.categoryId == this.courseCategoryId;
      const matchedFullName = dailyLeads.fullName.toLowerCase().trim() == this.fullName.toLowerCase().trim();
      const matchedStatus = dailyLeads.status == this.status;
      return matchedCourseId || matchedCourseCategoryId || matchedFullName || matchedStatus;
    });
    // this.currentPage = 1; // Reset to first page on filter
    // this.calculateTotalPages();

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

  getAllCourses() {
    this.courseService.getAllCourses().subscribe(
      res => {
        this.courses = res.data;
      },
      error => {
        console.error('Error fetching courses:', error);
      }
    );
  }
  getCourseCategories() {
    this.courseCategoryService.getCourseCategories().subscribe((res) => {
      this.courseCategories = res.data;
    });
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
        console.log('error1', error)
      }
    )
  }

  getCourseName(courseId: number): string {
    const foundCourse = this.courses.find(course => course.courseId == courseId);
    return foundCourse ? foundCourse.courseName : 'Unknown';
  }
  getCounsellorName(counsellorId: number): string {
    const foundCounsellor = this.counsellors.find(counsellor => counsellor.counsellorId == counsellorId);
    return foundCounsellor ? foundCounsellor.counsellorName : 'Unknown';
  }


  updateDailyLeadStatus(leadId: number, leadStatus: string) {
    if (leadStatus === 'Active') {
      leadStatus = 'Inactive';
    } else {
      leadStatus = 'Active';
    }
    this.usersResponseService.updateDailyLeadStatus(leadId, leadStatus, this.comment).subscribe((res) => {
      //this.getAllDailyLeads();
      //this.filter();
    });
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

  filterCourseByCategory() {
    this.filteredCourses = this.courses.filter((course: CourseDTO) => {
      return course.courseCategoryId == this.selectedDailyLead.courseCategoryId;
    })

  }
}
