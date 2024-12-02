import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CourseDTO } from 'src/app/dto/CourseDTO';
import { CoursePopUpDTO } from 'src/app/dto/CoursePopUpDTO';
import { CourseServiceService } from 'src/app/services/course-service.service';
import { CoursePopUpService } from 'src/app/services/coursepopup.service';
import { DataServiceService } from 'src/app/services/data-service.service';
import { UserStorageService } from 'src/app/services/user-storage.service';

@Component({
  selector: 'app-add-popup',
  templateUrl: './add-popup.component.html',
  styleUrls: ['./add-popup.component.scss']
})
export class AddPopupComponent implements OnInit {

  public coursePopUp: CoursePopUpDTO[] = [];
  public courses: CourseDTO[] = [];
  coursePopUpForm: FormGroup = this.formBuilder.group({});
  coverImageFile: File | null = null;
  
  
  constructor(private router: Router,
    private coursepopupservice: CoursePopUpService,
    private dataService: DataServiceService,
    private formBuilder: FormBuilder,
    private toasterService: ToastrService,
    private courseService: CourseServiceService,
    private userStorageService: UserStorageService) {

  }

  addPopUp() {
    this.router.navigate(['/super-admin/add-Pop-Up']);
  }
  ngOnInit(): void {
    this.getAllCourses();
    this.coursePopUpForm = this.formBuilder.group({
      courseName: ['', Validators.required],
      coverImage: [''],
    });
  }
  
  
  onSubmit(): void {
    if (this.coursePopUpForm.valid && this.coverImageFile) {
      const coursePopUpData = this.coursePopUpForm.value;
      this.coursepopupservice.addCoursePopUp(coursePopUpData, this.coverImageFile).subscribe(
        (res: any) => {
          this.toasterService.success(res.message);
          if (this.userStorageService.getRole() == 'SUPERADMIN') {
            this.router.navigate(['/super-admin/course-popup']);
          } else {
            this.router.navigate(['/admin/course-popup']);
          }
        });
    }
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
  
  onFileChange(event: any) {
    const files: FileList = event.target.files;
    if (files && files.length > 0) {
      this.coverImageFile = files[0];
    }
  }

  }
  
  
  