import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TrainerPaymentDTO } from 'src/app/dto/TrainerPaymentDTO';
import { DataServiceService } from 'src/app/services/data-service.service';
import { TrainerService } from 'src/app/services/trainer.service';

@Component({
  selector: 'app-update-trainers-payment',
  templateUrl: './update-trainers-payment.component.html',
  styleUrls: ['./update-trainers-payment.component.scss']
})
export class UpdateTrainersPaymentComponent implements OnInit {
trainerPayment: TrainerPaymentDTO = {
  paymentId: 0,
  trainerName: '',
  paidAmount: 0,
  paymentDate: new Date(),
  comments: '',
  trainerId: 0
}
  constructor(
    private trainerService: TrainerService,
    private router: Router,
    private dataService: DataServiceService,
    private activeRoute: ActivatedRoute,
    private toaster: ToastrService
  ) {}

  ngOnInit(): void {
    this.trainerPayment = this.dataService.trainersPaymentData;
  }

  onSubmit(): void {
    if (this.trainerPayment) { 
      this.trainerService.updateTrainerPayment(this.trainerPayment).subscribe(
        (res: any) => {
          this.toaster.success('Data Updated Successfully');
          this.router.navigate(['/super-admin/add-trainer-payment']);
        },
        (error) => {
          console.error("Error:", error);
        }
      );
    } 
  }

  updateTrainerPayment() {
    this.router.navigate(['/super-admin/add-trainer-payment']);
  }
}
