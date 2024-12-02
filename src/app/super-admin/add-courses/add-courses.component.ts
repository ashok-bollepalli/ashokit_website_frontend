import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router } from '@angular/router';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ToastrService } from 'ngx-toastr';
import { CourseCategoryDTO } from 'src/app/dto/CourseCategoryDTO';
import { CourseCategoryService } from 'src/app/services/course-category.service';
import { CourseServiceService } from 'src/app/services/course-service.service';
import { UserStorageService } from 'src/app/services/user-storage.service';

@Component({
  selector: 'app-add-courses',
  templateUrl: './add-courses.component.html',
  styleUrls: ['./add-courses.component.scss'],
})
export class AddCoursesComponent implements OnInit {
  public Editor = ClassicEditor;
  courseForm: FormGroup = this.formBuilder.group({});
  courseCategories: CourseCategoryDTO[] = [];
  coverImageFile: File | null = null;
  courseContentFile: File | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private sanitizer: DomSanitizer,
    private courseService: CourseServiceService,
    private courseCategoryService: CourseCategoryService,
    private router: Router,
    private toaster: ToastrService,
    private userStorageService: UserStorageService
  ) { }

  ngOnInit(): void {
    this.courseForm = this.formBuilder.group({
      courseName: ['', Validators.required],
      courseUrl: ['', Validators.required],
      courseCategoryId: [],
      coverImage: [null],
      demoVideoUrl: [''],
      aboutCourse: [''],
      preRequisites: [''],
      courseContent: [''],
      metaTitle: ['', Validators.required],
      metaDescription: ['', Validators.required],
      courseFee: ['', Validators.required],
      courseOfferFee: ['', Validators.required],
      courseRating: ['', Validators.required],
      courseDuration: ['', Validators.required],
      metaKeywords: ['', Validators.required],
      imageAltTags: ['', Validators.required],
      ratingValue1: ['', Validators.required],
      ratingValue2: ['', Validators.required],
      worstRating: ['', Validators.required],
      ratingCount: ['', Validators.required],
      reviewCount: ['', Validators.required],
    });

    this.getCourseCategories();
  }

  sanitizeAboutCourseInput(htmlString: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(htmlString);
  }

  onSubmit(): void {
    if (this.courseForm.valid && this.coverImageFile && this.courseContentFile) {
      const courseData = this.courseForm.value;
      if (this.coverImageFile) {
        this.courseService
          .addCourse(courseData, this.coverImageFile, this.courseContentFile)
          .subscribe((res) => {
            this.toaster.success('Data Added Successfully');
            if (this.userStorageService.getRole() == 'SUPERADMIN') {
              this.router.navigate(['/super-admin/view-courses']);
            } else {
              this.router.navigate(['/admin/view-courses']);
            }
          });
      }
    }
  }

  onFileChange(event: any) {
    const files: FileList = event.target.files;
    if (files && files.length > 0) {
      this.coverImageFile = files[0];
    }
  }

  onCourseContentFileChange(event: any) {
    const files: FileList = event.target.files;
    if (files && files.length > 0) {
      this.courseContentFile = files[0];
    }
  }

  getCourseCategories() {
    this.courseCategoryService.getCourseCategories().subscribe(
      (res) => {
        this.courseCategories = res.data;
        console.log(this.courseCategories);
      },
      (error) => { }
    );
  }
}
