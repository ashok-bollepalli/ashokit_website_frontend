import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CourseCategoryDTO } from 'src/app/dto/CourseCategoryDTO';
import { CourseDTO } from 'src/app/dto/CourseDTO';
import { CourseCategoryService } from 'src/app/services/course-category.service';
import { CourseServiceService } from 'src/app/services/course-service.service';
import { DataServiceService } from 'src/app/services/data-service.service';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { UserStorageService } from 'src/app/services/user-storage.service';

@Component({
  selector: 'app-update-course',
  templateUrl: './update-course.component.html',
  styleUrls: ['./update-course.component.scss']
})
export class UpdateCourseComponent implements OnInit {
  public Editor = ClassicEditor;
  course!: CourseDTO;
  courseName: string = '';
  courseCategories: CourseCategoryDTO[] = [];
  coverImageFile!: File ;
  courseContentFile!: File;

  constructor(
    private courseService: CourseServiceService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dataService: DataServiceService,
    private courseCategoryService: CourseCategoryService,
    private toaster: ToastrService,
    private userStorageService: UserStorageService

  ) { }
  ngOnInit(): void {
    this.course = this.dataService.courseData;
    this.getCourseCategories();
  }
  onSubmit(): void {
    if (this.course) {
      this.courseService.updateCourse(this.course).subscribe(
        (res: any) => {
          this.toaster.success('Data Updated Successfully');
          if (this.userStorageService.getRole() == 'SUPERADMIN') {
            this.router.navigate(['/super-admin/view-courses']);
          } else {
            this.router.navigate(['/admin/view-courses']);
          }
        });
    }
  }

  onSubmit1(): void {
    if (this.course) {
      this.courseService.updateCourseNew(this.course, this.coverImageFile, this.courseContentFile).subscribe(
        (res: any) => {
          this.toaster.success('Data Updated Successfully');
          if (this.userStorageService.getRole() == 'SUPERADMIN') {
            this.router.navigate(['/super-admin/view-courses']);
          } else {
            this.router.navigate(['/admin/view-courses']);
          }
        });
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
      res => {
        this.courseCategories = res.data;
      },
      error => {

      }
    );
  }
}
