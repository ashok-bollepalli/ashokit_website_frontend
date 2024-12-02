import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CounsellorDTO } from 'src/app/dto/CounsellorDTO';
import { CounsellorService } from 'src/app/services/counsellor.service';
import { DataServiceService } from 'src/app/services/data-service.service';

@Component({
  selector: 'app-edit-counsellor',
  templateUrl: './edit-counsellor.component.html',
  styleUrls: ['./edit-counsellor.component.scss']
})
export class EditCounsellorComponent implements OnInit{
  counsellor!: CounsellorDTO;
 name: any;
 email: any;
 counsellorName: string='';
 phoneNumber: string='';
 responsibilities: string='';
 public Editor = ClassicEditor;
  
constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dataService: DataServiceService,
    private counsellorService: CounsellorService,
    private toaster: ToastrService,
    
     ) {}

  ngOnInit(): void {
    this.counsellor = this.dataService.counsellorData;
}


     onSubmit(): void{
      if(this.counsellor) {
        this.counsellorService. updateCounsellor(this.counsellor).subscribe(
          (res: any) => {
            this.toaster.success('Data Updated Successfully');
            this.router.navigate(['/super-admin/counsellor']);
          },
          (error) => {
            console.error("Error:", error);
          }
        );
      } else {
       
      }
    }

}
