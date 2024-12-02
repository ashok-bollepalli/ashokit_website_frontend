import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { StudentPaymentDTO } from 'src/app/dto/StudentPaymentDTO';
import { DataServiceService } from 'src/app/services/data-service.service';
import { UsersResponseService } from 'src/app/services/users-response.service';

@Component({
  selector: 'app-update-student-payment',
  templateUrl: './update-student-payment.component.html',
  styleUrls: ['./update-student-payment.component.scss']
})
export class UpdateStudentPaymentComponent implements OnInit{
  studentPayment!: StudentPaymentDTO;

  constructor(
    private dataService: DataServiceService,
    private userResponseService: UsersResponseService,
    private toaster: ToastrService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.studentPayment = this.dataService.studentPaymentData;
  }

  onSubmit(): void {
    if (this.studentPayment) {
      this.userResponseService.updateStudentPayment(this.studentPayment).subscribe(
        (res: any) => {
          this.toaster.success('Data Updated Successfully');
          this.router.navigate(['/super-admin/view-payment']);
        },
        (error) => {
          console.error("Error:", error);
        }
      );
    } else {
     
    }
  }

}
