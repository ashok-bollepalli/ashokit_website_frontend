import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CourseCategoryDTO } from 'src/app/dto/CourseCategoryDTO';
import { CourseCategoryService } from 'src/app/services/course-category.service';
import { DataServiceService } from 'src/app/services/data-service.service';
import { UserStorageService } from 'src/app/services/user-storage.service';

@Component({
  selector: 'app-edit-course-category',
  templateUrl: './edit-course-category.component.html',
  styleUrls: ['./edit-course-category.component.scss']
})
export class EditCourseCategoryComponent implements OnInit {
  courseCategory!: CourseCategoryDTO;

  constructor(
    private dataService: DataServiceService,
    private CourseCategoryService: CourseCategoryService,
    private router: Router,
    private toaster: ToastrService,
    private userStorageService: UserStorageService
  ) { }


  ngOnInit(): void {
    this.courseCategory = this.dataService.courseCategoryData;
  }
  
  onsubmit(): void {
    if (this.courseCategory.courseCategoryId && this.courseCategory) {
      this.CourseCategoryService.editCourseCategory(this.courseCategory.courseCategoryId, this.courseCategory).subscribe(
        (res: any) => {
          this.toaster.success('Data Updated Successfully');
          if (this.userStorageService.getRole() == 'SUPERADMIN') {
            this.router.navigate(['/super-admin/view-course-category']);
          } else {
            this.router.navigate(['/admin/view-course-category']);
          }
        });
    }
  }
}

