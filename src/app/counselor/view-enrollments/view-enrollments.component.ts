import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ScheduleBatchDTO } from 'src/app/dto/ScheduleBatchDTO';
import { StudentPaymentDTO } from 'src/app/dto/StudentPaymentDTO';
import { TrainerDTO } from 'src/app/dto/TrainerDTO';
import { ViewPaymentDTO } from 'src/app/dto/ViewPaymentDTO';
import { BatchesScheduleService } from 'src/app/services/batches-schedule.service';
import { DataServiceService } from 'src/app/services/data-service.service';
import { TrainerService } from 'src/app/services/trainer.service';
import { UsersResponseService } from 'src/app/services/users-response.service';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-view-enrollments',
  templateUrl: './view-enrollments.component.html',
  styleUrls: ['./view-enrollments.component.scss']
})
export class ViewEnrollmentsComponent implements OnInit {

  public filteredPayments: StudentPaymentDTO[] = [];
  public payments: StudentPaymentDTO[] = [];
  public trainers: TrainerDTO[] = [];
  public batches: ScheduleBatchDTO[] = [];
  public selectedBatches: any[] = [];
  public batchCode: string = '';
  public fromDate: any;
  public toDate: any;
  public trainerId: number | null = null;
  public status: string = '';
  public email: string = '';
  public pageSize: number = 15;
  public currentPage: number = 1;
  public totalItems: number = 0;
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();

  public viewPayment: ViewPaymentDTO = {
    id: 0,
    userName: '',
    trainerId: 0,
    email: '',
    phoneNumber: '',
    amount: '',
    batchCode: '',
    status: '',
    courseName: '',
    fromdate: '',
    todate: '',
    dueAvailable: ''
  }

  constructor(private router: Router,
    private usersResponseService: UsersResponseService,
    private batchesScheduleService: BatchesScheduleService,
    private trainerService: TrainerService,
    private dataService: DataServiceService) { }

  ngOnInit(): void {
   // this.getAllStudentViewPayments();
   // this.getAllViewPayments();
    this.getAllTrainers();
    this.getAllScheduledBatches();    
  }

  getAllViewPayments() {
    this.usersResponseService.getAllViewPayments(this.viewPayment).subscribe(
      res => {
        this.payments = res.data;
        this.filteredPayments = res.data;
      },
      error => {
        console.log('error1', error)
      }
    )
  }
  getAllStudentViewPayments() {
    this.usersResponseService.getAllStudentViewPayments().subscribe(
      res => {
        this.payments = res.data;
      },
      error => {
        console.log('error1', error)
      }
    )
  }
  getAllTrainers() {
    this.trainerService.getAllTrainers().subscribe(
      res => {
        this.trainers = res.data

      },
      error => {
        console.error('Error fetching courses:', error);
      }
    );
  }

  getAllScheduledBatches() {
    this.batchesScheduleService.getAllScheduledBatches().subscribe(
      res => {
        this.batches = res.data;
        this.selectedBatches= res.data;
      },
      error => {
        console.log('error1', error)
      }
    )
  }

  getTrainerName(trainerId: number): string {
    const trainer = this.trainers.find(trainer => trainer.trainerId === trainerId);
    return trainer ? trainer.trainerName : '';
  }

  applyFilters() {
    this.usersResponseService.getAllViewPayments(this.viewPayment).subscribe(
      res => {
        this.payments = res.data;
        this.filteredPayments = res.data;
      },
      error => {
        console.log('error1', error)
      }
    )
    this.calculateTotalPages();
  }


  calculateTotalPages() {
    if (this.filteredPayments) {
      this.totalItems = this.filteredPayments.length;
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
    XLSX.utils.book_append_sheet(wb, ws, 'Payments');
    XLSX.writeFile(wb, 'payments.xlsx');
  }

  findBatchByCourseStatus(obj: any) {
    this.selectedBatches = this.batches.filter(data => data.courseStatus == obj.target.value && data.trainerId == this.viewPayment.trainerId);
  }

  private constructExcelContent(): any[] {
    return this.payments.map(Payments => ({
      'Id': Payments.paymentId,
      'UserName': Payments.studentName,
      'Email': Payments.studentEmail,
      'CourseName': Payments.courseId,
      'PhoneNumber': Payments.phoneNumber,
      'Amount': Payments.paidAmount,
      'BatchCode': Payments.batchCode,
      'TrainerId': Payments.trainerId
    }));
  }

 

  confirmDelete(paymentId: number): void {
    const confirmation = window.confirm('Are you sure you want to delete this record ?');
    if (confirmation) {
      this.deleteStudentPayment(paymentId);
    }
  }

  deleteStudentPayment(studentPaymentId: number) {
    this.usersResponseService.deleteStudentPayment(studentPaymentId).subscribe((res) => {
      this.getAllStudentViewPayments();
      this.applyFilters();
    });
  }
  updateStudentPayment(payment: StudentPaymentDTO) {
    this.dataService.studentPaymentData = payment;
    this.router.navigate(['/super-admin/update-student-payment']);
  }
}

