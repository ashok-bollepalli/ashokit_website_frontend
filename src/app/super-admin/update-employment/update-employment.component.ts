import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MockInterviewFeeDTO } from 'src/app/dto/MockInterviewFeeDTO';
import { DataServiceService } from 'src/app/services/data-service.service';
import { MockInterviewFeeService } from 'src/app/services/mock-interview-fee.service';

@Component({
  selector: 'app-update-employment',
  templateUrl: './update-employment.component.html',
  styleUrls: ['./update-employment.component.scss']
})
export class UpdateEmploymentComponent {
mockInterviewFee!:MockInterviewFeeDTO;
fee: string = '';
employment: any;


constructor( private router: Router,
private dataService: DataServiceService,
private activatedRoute: ActivatedRoute,
private mockInterviewFeeService:MockInterviewFeeService,
private toaster: ToastrService
){ }
ngOnInit() {


  this.mockInterviewFee = this.dataService.mockInterviewFeeData;
}
onSubmit() {
  if (this.mockInterviewFee) {
    this.mockInterviewFeeService.updateMockInterviewFee(this.mockInterviewFee).subscribe(
      (res: any) => {
        this.toaster.success('Data Updated Successfully');
        this.router.navigate(['super-admin/list-mock-interviews-fee'])
      },
      (error: any) => {
        console.error("Error:", error);
      }
    );
  }
}

updateMockInterviewFee() {
  this.router.navigate(['super-admin/list-mock-interviews-fee'])
}


}
