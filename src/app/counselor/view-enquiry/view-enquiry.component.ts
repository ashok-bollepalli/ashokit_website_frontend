import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CourseCategoryDTO } from 'src/app/dto/CourseCategoryDTO';
import { CourseDTO } from 'src/app/dto/CourseDTO';
import { EnquiryDTO } from 'src/app/dto/EnquiryDTO';
import { TrainerDTO } from 'src/app/dto/TrainerDTO';
import { EnquiryService } from 'src/app/services/Enquiry/enquiry.service';
import { CourseCategoryService } from 'src/app/services/course-category.service';
import { CourseServiceService } from 'src/app/services/course-service.service';
import { DataServiceService } from 'src/app/services/data-service.service';
import { TrainerService } from 'src/app/services/trainer.service';
import { UsersResponseService } from 'src/app/services/users-response.service';


@Component({
  selector: 'app-view-enquiry',
  templateUrl: './view-enquiry.component.html',
  styleUrls: ['./view-enquiry.component.scss']
})
export class ViewEnquiryComponent implements OnInit {
  public enq!: EnquiryDTO;
  public enquiries: EnquiryDTO[] = [];
  public courses: CourseDTO[] = [];
  public filteredCourses: CourseDTO[] = [];
  public trainer: TrainerDTO[] = [];
  public createdAt: any;
  public courseCategories: CourseCategoryDTO[] = [];
  public fullName: string = '';
  public courseId: number = 1;
  public status: string = '';
  
  public pageSize: number = 10;
  public currentPage: number = 1;
  public totalItems: number = 0;
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();

  public filteredEnquirys: EnquiryDTO[] = [];
  public categoryId: any;
  public selectedEnquiry: EnquiryDTO = {
    id: 0,
    fullName: '',
    webinarName: '',
    email: '',
    mobilNumber: 0,
    wtCountryCode: 0,
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
    enqSource: ''
  };
  public comment!: string;

  constructor(
    private enquiryService: EnquiryService,
    private usersResponseService: UsersResponseService,
    private router: Router,
    private courseService: CourseServiceService,
    private trainerService: TrainerService,
    private dataService: DataServiceService,
    private courseCategoryService: CourseCategoryService) { }

  @ViewChild('myModal') myModal!: ElementRef;


  ngOnInit(): void {
    this.getAllEnquiries();
    this.getAllCourses();
    this.getCourseCategories();
    this.calculateTotalPages();
  }

  addEnquiry() {
    this.router.navigate(['/counselor/add-enquiry']);
  }
  closeModal(): void {
    const modalElement = this.myModal.nativeElement;
    modalElement.style.display = 'none';
    modalElement.classList.remove('show');
  }
  openModal(enquiry: any): void {
    this.selectedEnquiry = {
      ...enquiry,
      comments: '',
    };
    const modalElement = document.querySelector('.modal') as HTMLElement;
    modalElement.style.display = 'block';
    modalElement.classList.add('show');
  }

  updateLeadStatus() {
    this.enquiryService.updateEnquiryStatusAndComments(this.selectedEnquiry.id, this.selectedEnquiry.status, this.comment).subscribe((res) => {
      this.closeModal();
      this.getAllEnquiries();
    });
  }


  getAllCourses() {
    this.courseService.getAllCourses().subscribe(res => {
      this.courses = res.data;
      this.filteredCourses = res.data;
    });
  }

  getAllEnquiries() {
    this.enquiryService.getAllEnquiries().subscribe(
      res => {
        this.enquiries = res.data;
        this.filteredEnquirys = res.data;
      },
      error => {
      }
    );
  }

  getAllEnquiriesWithFilter() {
    console.log(this.selectedEnquiry);
    this.enquiryService.getEnquriesWithFilter(this.selectedEnquiry).subscribe(
      res => {
        this.filteredEnquirys = res.data;
        this.enquiries = res.data;
      },
      error => {
      }
    );

  }

  updateEnquiryStatus(id: number, status: string) {
    if (status === 'Active') {
      status = 'Inactive';
    } else {
      status = 'Active';
    }
    this.enquiryService.updateEnquiryStatus(id, status).subscribe((res) => {
      this.getAllEnquiries();
      // this.filter();
    });
  }


  updateEnquiryPaymentStatus(id: number, paymentStatus: string) {
    if (paymentStatus === 'Active') {
      paymentStatus = 'Inactive';
    } else {
      paymentStatus = 'Active';
    }
    this.enquiryService.updateEnquiryPaymentStatus(id, paymentStatus).subscribe((res) => {
      this.getAllEnquiries();
      // this.filter();
    });
  }

  getCourseName(courseId: number): string {
    const foundCourse = this.courses.find(course => course.courseId === courseId);
    if (foundCourse) {
      return foundCourse.courseName;
    }
    else {
      console.log('course not found for ID:', courseId);
      return 'Unknown';
    }
  }


  calculateTotalPages() {
    if (this.filteredEnquirys) {
      this.totalItems = this.filteredEnquirys.length;
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
  getCourseCategories() {
    this.courseCategoryService.getCourseCategories().subscribe(
      res => {
        this.courseCategories = res.data;
      },
      error => {

      }
    );
  }

  filterCourseByCategory() {
    this.filteredCourses = this.courses.filter((course: CourseDTO) => {
      return course.courseCategoryId == this.selectedEnquiry.courseCategoryId;
    })

  }
}
