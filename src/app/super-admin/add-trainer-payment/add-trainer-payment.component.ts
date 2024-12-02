import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { TrainerDTO } from 'src/app/dto/TrainerDTO';
import { TrainerPaymentDTO } from 'src/app/dto/TrainerPaymentDTO';
import { DataServiceService } from 'src/app/services/data-service.service';
import { TrainerService } from 'src/app/services/trainer.service';
@Component({
  selector: 'app-add-trainer-payment',
  templateUrl: './add-trainer-payment.component.html',
  styleUrls: ['./add-trainer-payment.component.scss']
})
export class AddTrainerPaymentComponent implements OnInit {
  public trainerPayments: TrainerPaymentDTO[] = [];
  public filteredTrainerpayments: TrainerPaymentDTO[] = [];
  public trainers: TrainerDTO[] = [];
  public trainerId: number = 0;
  public paymentId: number = 0;
  public trainerName: string = '';
  
  public pageSize: number = 5; 
  public currentPage: number = 1; 
  public totalItems: number = 0;
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();



  ngOnInit(): void {
    this.getAllTrainerPayments()
    this.getAllTrainers();
  }

  constructor(private router: Router,
    private trainerService: TrainerService,
    private dataService: DataServiceService) { }

    filter() {

    this.filteredTrainerpayments = this.trainerPayments.filter((trainerPayment: TrainerPaymentDTO) => {
            return trainerPayment.trainerId == this.trainerId;
    });
    this.calculateTotalPages();

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

  getAllTrainerPayments() {
    this.trainerService.getAllTrainerPayments().subscribe(
      res => {
        this.trainerPayments = res.data;
        this.filteredTrainerpayments  = res.data;
      
      },
      error => {
        console.error('Error fetching trainer payments:', error);
      }
    );
  }

  getTrainerName(trainerId: number): string {
    const foundCourse = this.trainers.find(trainer => trainer.trainerId == trainerId);
    return foundCourse ? foundCourse.trainerName : 'Unknown';
  }
  
  trainerpaymentdetails() {
    this.router.navigate(['/super-admin/trainer-payment-details']);
  }
  calculateTotalPages() {
    if (this.filteredTrainerpayments) {
      this.totalItems = this.filteredTrainerpayments.length;
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
  editTrainersPayment(trainer:TrainerPaymentDTO){
    this.dataService.trainersPaymentData = trainer;
    this.router.navigate(['/super-admin/update-trainers-payment']);
  }
  deleteTrainerPayment(trainerPaymentId: number) {
    this.trainerService.deleteTrainerPayment(trainerPaymentId).subscribe((res) => {
      this.getAllTrainerPayments();
      this.filter();
    })

  }
}
