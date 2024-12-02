import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CourseCategoryDTO } from 'src/app/dto/CourseCategoryDTO';
import { CourseDTO } from 'src/app/dto/CourseDTO';
import { CourseCategoryService } from 'src/app/services/course-category.service';
import { CourseServiceService } from 'src/app/services/course-service.service';
import { UserStorageService } from 'src/app/services/user-storage.service';

@Component({
  selector: 'app-add-view-module',
  templateUrl: './add-view-module.component.html',
  styleUrls: ['./add-view-module.component.scss']
})
export class AddViewModuleComponent implements OnInit {
  public courseCategories: CourseCategoryDTO[] = [];
  public courses: CourseDTO[] = [];
  public selectedCourses: any[] = [];
  moduleForm: FormGroup = this.formBuilder.group({});

  constructor(private formBuilder: FormBuilder,
    private courseService: CourseServiceService,
    private router: Router,
    private courseCategoryService: CourseCategoryService,
    private toaster: ToastrService,
    private userStorageService: UserStorageService) { }

  ngOnInit(): void {
    this.getAllCourses();
    this.getAllCourseCategories();
    this.moduleForm = this.formBuilder.group({
      courseCategoryId: ['', Validators.required],
      courseId: ['', Validators.required],
      moduleName: ['', Validators.required]
      // activeStatus: ['', Validators.required]

    });
  }

  getAllCourses() {
    this.courseService.getAllCourses().subscribe(
      res => {
        this.courses = res.data;
      },
      error => {
      }
    );
  }

  onSubmit(): void {
    if (this.moduleForm.valid) {
      const moduleData = this.moduleForm.value;
      this.courseService.addCourseModule(moduleData).subscribe(res => {
        this.toaster.success('Data Added Successfully');
        if (this.userStorageService.getRole() == 'SUPERADMIN') {
          this.router.navigate(['/super-admin/view-modules']);
        } else {
          this.router.navigate(['/admin/view-modules']);
        }
      });
    }
  }


  getAllCourseCategories() {
    this.courseCategoryService.getCourseCategories().subscribe((res: any) => {
      this.courseCategories = res.data;
    },
      (error) => {
        console.log('Error fetching courseCategories');
      }
    )
  }

  findCourseByCategory(e: any) {
    this.selectedCourses = this.courses.filter(data => data.courseCategoryId == e.target.value);
  }

}