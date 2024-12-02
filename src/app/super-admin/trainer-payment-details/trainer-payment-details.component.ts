import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TrainerService } from 'src/app/services/trainer.service';

@Component({
  selector: 'app-trainer-payment-details',
  templateUrl: './trainer-payment-details.component.html',
  styleUrls: ['./trainer-payment-details.component.scss']
})
export class TrainerPaymentDetailsComponent implements OnInit {

  public trainers: any[] = [];
  trainerpaymentsForm: FormGroup = this.formBuilder.group({});



  constructor(
    private formBuilder: FormBuilder,
    private trainerService: TrainerService,
    private router: Router,
    private toaster: ToastrService
  ) { }

  ngOnInit(): void {
    this.formInitialization();
    this.getAllTrainers();
  }

  formInitialization() {
    this.trainerpaymentsForm = this.formBuilder.group({
      trainerId: ['', Validators.required],
      paidAmount: ['', Validators.required],
      paymentDate: [' ', Validators.required],
      comments: ['']
    });
  }

  onSubmit(): void {
    if (this.trainerpaymentsForm.valid) {
      const trainerPaymentsData = this.trainerpaymentsForm.value;
      this.trainerService.addTrainerPayment(trainerPaymentsData).subscribe(res => {
        this.toaster.success('Data Added Successfully');
        this.router.navigate(['/super-admin/add-trainer-payment']);
      });
    }
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

}

