import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { CourseDTO } from 'src/app/dto/CourseDTO';
import { ScheduleBatchDTO } from 'src/app/dto/ScheduleBatchDTO';
import { StudentPaymentDTO } from 'src/app/dto/StudentPaymentDTO';
import { TrainerDTO } from 'src/app/dto/TrainerDTO';
import { ViewEnrollmentDTO } from 'src/app/dto/ViewEnrollmentDTO';
import { BatchesScheduleService } from 'src/app/services/batches-schedule.service';
import { CourseServiceService } from 'src/app/services/course-service.service';
import { PaymentSettingsService } from 'src/app/services/payment-settings.service';
import { TrainerService } from 'src/app/services/trainer.service';
import { ViewEnrollmentService } from 'src/app/services/view-enrollment.service';


@Component({
  selector: 'app-view-enrollment',
  templateUrl: './view-enrollment.component.html',
  styleUrls: ['./view-enrollment.component.scss']
})
export class ViewEnrollmentComponent implements OnInit {
  public courses: CourseDTO[] = [];
  public trainers: TrainerDTO[] = [];
  public trainerId: number = 0;
  public batchCode!: string;
  public batches: ScheduleBatchDTO[] = [];
  public refundStatus: string = '';
  viewEnrollments: StudentPaymentDTO[] = [];

  public pageSize: number = 10; 
  public currentPage: number = 1; 
  public totalItems: number = 0;
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();
  
  filteredViewEnrollments: StudentPaymentDTO[] = [];
  public selectedBatches: ScheduleBatchDTO[] = [];
 

  public selectedEnroment: StudentPaymentDTO = {
    paymentId: 0,
    razorpayPaymentId: '',
    paidAmount: '',
    dueAmount: '',
    invoiceNumber: '',
    paymentMode: '',
    videosAccess: '',
    classType: '',
    batchCode: '',
    enrollmentStatus: '',
    refundStatus: '',
    studentName: '',
    studentEmail: '',
    countryCode: '',
    wtCountryCode: '',
    whatsappNumber: '',
    phoneNumber: '',
    followupStatus: '',
    frontOfcMsg: '',
    batchType: '',
    batchId: 0,
    courseId: 0,
    trainerId: 0,
    counsellorId: 0,
    studentId: 0,
  };

  constructor(
    private courseService: CourseServiceService,
    private viewEnrollmentService: ViewEnrollmentService,
    private trainerService: TrainerService,
    private batchesScheduleService: BatchesScheduleService,
    private paymentSettingsService: PaymentSettingsService
  ) { }

  @ViewChild('myModal') myModal!: ElementRef;

  ngOnInit(): void {
    this.getAllCourses();
    this.getViewEnrollments();
    this.getAllTrainers();
    this.getAllScheduledBatches();
  }


  closeModal(): void {
    const modalElement = this.myModal.nativeElement;
    modalElement.style.display = 'none';
    modalElement.classList.remove('show');
  }
  openModal(enquiry: any): void {
    this.selectedEnroment = {
      ...enquiry,
      // comments: '', 
    };
    const modalElement = document.querySelector('.modal') as HTMLElement;
    modalElement.style.display = 'block';
    modalElement.classList.add('show');
  }

  updateFrontOfcMsg() {
    this.paymentSettingsService.updateFrontOfcMsg(this.selectedEnroment.paymentId, this.selectedEnroment.followupStatus, this.selectedEnroment.frontOfcMsg).subscribe((res) => {
      this.closeModal();
      this.getViewEnrollments();
    });
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

  getCourseName(courseId: number): string {
    const foundCourse = this.courses.find(course => course.courseId === courseId);
    return foundCourse ? foundCourse.courseName : 'Unknown';
  }

  getViewEnrollments(): void {
    this.paymentSettingsService.getPendingViewEnrollments().subscribe(
      res => {
        this.viewEnrollments = res.data;
        this.filteredViewEnrollments = res.data;

      },
      error => {
        console.error('Error fetching courses:', error);
      }
    );
  }

  calculateTotalPages() {
    if (this.filteredViewEnrollments) {
      this.totalItems = this.filteredViewEnrollments.length;
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

  m1(id: number, status: string) {
    if (status === 'Active') {
      status = 'Inactive';
    } else {
      status = 'Active';
    }
    this.viewEnrollmentService.updateViewEnrollmentStatus(id, status).subscribe((res) => {
      this.getViewEnrollments();

    });
  }
  getTrainerName(trainerId: number): string {
    const foundTrainer = this.trainers.find(trainer => trainer.trainerId == trainerId);
    return foundTrainer ? foundTrainer.trainerName : 'Unknown';
  }


  getAllTrainers() {
    this.trainerService.getAllTrainers().subscribe(
      res => {
        this.trainers = res.data;
      },
      error => {
        console.error('Error fetching courses:', error);
      }
    );
  }

  findBatchByTrainer(e: any) {
    this.batches = this.batches.filter(data => data.trainerId == this.trainerId);
  }

  findBatchByTrainerAndCourseStatus(obj: any) {
    console.log('p', this.batches);
    this.selectedBatches = this.batches.filter(data => data.courseStatus == obj.target.value && data.trainerId == this.trainerId);
    console.log('q', this.selectedBatches);
  }

  filter() {
    this.filteredViewEnrollments = this.viewEnrollments.filter((viewEnrollment: StudentPaymentDTO) => {
      return  viewEnrollment.batchCode == this.batchCode;

    }
    );
    this.calculateTotalPages();
  }


  getBranchName(batchCode: number): string {
    const founBatch = this.batches.find(batch => batch.batchCode == this.batchCode);
    return founBatch ? founBatch.scheduleName : 'Unknown';
  }

  getAllScheduledBatches() {
    this.batchesScheduleService.getAllScheduledBatches().subscribe(res => {
      this.batches = res.data;
      this.selectedBatches = res.data;
    },
      error => {
        console.error('Error fetching courses:', error);
      }
    );
  }
}
