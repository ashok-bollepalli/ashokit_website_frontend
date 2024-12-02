import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TestimonialDTO } from 'src/app/dto/TestimonialDTO';
import { DataServiceService } from 'src/app/services/data-service.service';
import { TestimonialService } from 'src/app/services/testimonial.service';
import { UserStorageService } from 'src/app/services/user-storage.service';

@Component({
  selector: 'app-update-testimonial',
  templateUrl: './update-testimonial.component.html',
  styleUrls: ['./update-testimonial.component.scss']
})
export class UpdateTestimonialComponent implements OnInit{

  testimonial! : TestimonialDTO;
  name: string='';

  constructor(
    private testimonialService: TestimonialService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dataService: DataServiceService,
    private toaster: ToastrService,
    private userStorageService: UserStorageService
    
  ) {}

  ngOnInit(): void {

    this.testimonial = this.dataService.testimonialData;
  
    }
    
    onSubmit(): void {
      if(this.testimonial) {
        this.testimonialService.updateTestimonial(this.testimonial).subscribe(
          (res: any) => {
            this.toaster.success('Data Updated Successfully');
            if (this.userStorageService.getRole() == 'SUPERADMIN') {
              this.router.navigate(['/super-admin/testimonial']);
            } else {
              this.router.navigate(['/admin/testimonial']);
            }
          });
      }
    }
  

}
