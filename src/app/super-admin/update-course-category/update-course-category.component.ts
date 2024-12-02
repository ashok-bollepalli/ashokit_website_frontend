import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { InterviewCategoryDTO } from 'src/app/dto/InterviewCategoryDTO';
import { DataServiceService } from 'src/app/services/data-service.service';
import { InterviewCategoryService } from 'src/app/services/interview-category.service';
import { UserStorageService } from 'src/app/services/user-storage.service';

@Component({
  selector: 'app-update-course-category',
  templateUrl: './update-course-category.component.html',
  styleUrls: ['./update-course-category.component.scss']
})
export class UpdateCourseCategoryComponent {
  interviewCategory!: InterviewCategoryDTO;
  name: string = '';
  //description:String ='';
  constructor(private router: Router,
    private dataService: DataServiceService,
    private interviewCategoryService: InterviewCategoryService,
    private toaster: ToastrService,
    private userStorageService: UserStorageService) { }
  ngOnInit() {
    this.interviewCategory = this.dataService.interviewCategoryData;
  }
  onSubmit() {
    if (this.interviewCategory) {
      this.interviewCategoryService.updateInterviewCategory(this.interviewCategory).subscribe(
        (res: any) => {
          this.toaster.success('Data Updated Successfully');
          if (this.userStorageService.getRole() == 'SUPERADMIN') {
            this.router.navigate(['/super-admin/view-interview-category']);
          } else {
            this.router.navigate(['/admin/view-interview-category']);
          }
        });
    }
  }

}
