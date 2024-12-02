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
  selector: 'app-add-sub-module',
  templateUrl: './add-sub-module.component.html',
  styleUrls: ['./add-sub-module.component.scss']
})
export class AddSubModuleComponent implements OnInit {
  public courses: CourseDTO[] = [];
  public modules: any[] = [];
  public selectedCourses: any[] = [];
  public selectedModules: any[] = [];
  courseCategories: CourseCategoryDTO[] = [];
  SubModuleForm: FormGroup = this.formBuilder.group({});


  constructor(
    private courseService: CourseServiceService,
    private router: Router,
    private formBuilder: FormBuilder,
    private courseCategoryService: CourseCategoryService,
    private toaster: ToastrService,
    private userStorageService: UserStorageService
  ) { }

  ngOnInit(): void {
    this.SubModuleForm = this.formBuilder.group({
      courseCategoryId: ['', Validators.required],
      courseId: ['', Validators.required],
      moduleId: ['', Validators.required],
      subModuleName: ['', Validators.required],
      description: ['']
    });
    this.getAllCourses();
    this.getCourseCategories();
    this.getAllCourseModules();

  }


  onSubmit(): void {
    console.log('form-Data', this.SubModuleForm)
    if (this.SubModuleForm.valid) {
      const formData = this.SubModuleForm.value;
      this.courseService.addSubModule(formData).subscribe(
        (res: any) => {
          this.toaster.success('Data Added Successfully');
          if (this.userStorageService.getRole() == 'SUPERADMIN') {
            this.router.navigate(['/super-admin/view-sub-module']);
          } else {
            this.router.navigate(['/admin/view-sub-module']);
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
getAllCourseModules() {
  this.courseService.getAllCourseModules().subscribe(
    res => {
      this.modules = res.data;
    },
    error => {
      console.error('Error fetching courses:', error);
    }
  );
}

getCourseCategories() {
  this.courseCategoryService.getCourseCategories().subscribe(
    (res: { data: any; }) => {
      this.courseCategories = res.data;
    },

  );
}

findCourseByCategory(e: any) {
  this.selectedCourses = this.courses.filter(data => data.courseCategoryId == e.target.value);
  this.selectedModules = [];
}

findModuleByCourse(obj: any) {
  this.selectedModules = this.modules.filter(data => data.courseId == obj.target.value);
}
}
