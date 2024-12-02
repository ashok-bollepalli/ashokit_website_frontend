import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { CourseCategoryService } from 'src/app/services/course-category.service';
import { CourseServiceService } from 'src/app/services/course-service.service';
import { ToastrService } from 'ngx-toastr';
import { UserStorageService } from 'src/app/services/user-storage.service';

@Component({
  selector: 'app-add-course-category',
  templateUrl: './add-course-category.component.html',
  styleUrls: ['./add-course-category.component.scss']
})
export class AddCourseCategoryComponent {
  courseCategoryForm: FormGroup = this.formBuilder.group({});

  constructor(private formBuilder: FormBuilder,
    private sanitizer: DomSanitizer,
    private courseCategoryService: CourseCategoryService,
    private router: Router,
    private toaster: ToastrService,
    private userStorageService: UserStorageService) { }


  ngOnInit(): void {
    this.courseCategoryForm = this.formBuilder.group({
      courseCategoryName: ['', Validators.required],
      description: [''],
      status: ['', Validators.required],

    });
  }


  sanitizeAboutCourseInput(htmlString: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(htmlString);
  }

  onSubmit(): void {
    if (this.courseCategoryForm.valid) {
      const courseCategoryData = this.courseCategoryForm.value;
      this.courseCategoryService.addCourseCategory(courseCategoryData).subscribe(res => {
        this.toaster.success('Data Added Successfully');
        if (this.userStorageService.getRole() == 'SUPERADMIN') {
          this.router.navigate(['/super-admin/view-course-category']);
        } else {
          this.router.navigate(['/admin/view-course-category']);
        }
      });
    }
  }
}