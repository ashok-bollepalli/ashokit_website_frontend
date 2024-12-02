import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CourseDTO } from 'src/app/dto/CourseDTO';
import { CoursePopUpDTO } from 'src/app/dto/CoursePopUpDTO';
import { CourseServiceService } from 'src/app/services/course-service.service';
import { CoursePopUpService } from 'src/app/services/coursepopup.service';
import { DataServiceService } from 'src/app/services/data-service.service';
import { UserStorageService } from 'src/app/services/user-storage.service';

@Component({
  selector: 'app-update-popup',
  templateUrl: './update-popup.component.html',
  styleUrls: ['./update-popup.component.scss']
})
export class UpdatePopupComponent implements OnInit {
  public courses: CourseDTO[] = [];
  public coursePopups: CoursePopUpDTO[] = [];
  coursePopup!: CoursePopUpDTO;
  selectedCourseName: string = '';
  coverImageFile!: File ;
  


  constructor(
    private courseService: CourseServiceService,
    private router: Router,
    private dataService: DataServiceService,
    private coursePopupService: CoursePopUpService,
    private toaster: ToastrService,
    private userStorageService: UserStorageService
  ) { }

  ngOnInit(): void {
    this.getAllCourses();
    this.coursePopup = this.dataService.coursePopUpData;
    this.selectedCourseName = this.coursePopup.courseName;
  }

  getAllCourses() {
    this.courseService.getAllCourses().subscribe(
      res => {
        this.courses = res.data;
      },
      error => {
        console.error('Error fetching courses:', error);
      }
    );
  }



  onSubmit(): void {
    if (this.coursePopup) {
      this.coursePopupService.updateCoursePopup(this.coursePopup, this.coverImageFile).subscribe(
        (res: any) => {
          this.toaster.success('Data Updated Successfully');
          if (this.userStorageService.getRole() == 'SUPERADMIN') {
            this.router.navigate(['/super-admin/course-popup']);
          } else {
            this.router.navigate(['/admin/course-popup']);
          }
        });
    }

  }
  updateCoursePopUp() {
    this.router.navigate(['/super-admin/course-popup']);
  }


  onFileChange(event: any) {
    const files: FileList = event.target.files;
    if (files && files.length > 0) {
      this.coverImageFile = files[0];
    }
  }


}
