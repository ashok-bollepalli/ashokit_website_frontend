import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CourseServiceService } from 'src/app/services/course-service.service';
import { DataLoaderService } from 'src/app/services/data-loader.service';
import { DataServiceService } from 'src/app/services/data-service.service';
import { Router } from '@angular/router';
import { CourseCategoryDTO } from 'src/app/dto/CourseCategoryDTO';
import { CourseDTO } from 'src/app/dto/CourseDTO';
import { CourseDetailsDTO } from 'src/app/dto/CourseDetailsDTO';
import { TrainerDTO } from 'src/app/dto/TrainerDTO';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-student-home',
  templateUrl: './student-home.component.html',
  styleUrls: ['./student-home.component.scss'],
})
export class StudentHomeComponent implements OnInit {
  course!: CourseDTO;
  courseDetail: CourseDetailsDTO[] = [];
  courses: any;
  courseCategories: CourseCategoryDTO[] = [];
  public trainers: TrainerDTO[] = [];
  constructor(
    private courseService: CourseServiceService,
    private dataLoaderService: DataLoaderService,
    private dataService: DataServiceService,
    private meta: Meta, private titleService: Title,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.setMetaTags();
    this.getBatchesOpenForEnrollment();
    this.getCourseCategories();
    //this.getAllCourses();
    this.courses = this.dataService.courseDatas;
    this.getAllTrainers();
  }

  setMetaTags() {
    // Set the title
    this.titleService.setTitle('Best Software Training Institute in Hyderabad | Ashok IT');

    // Set meta description
    this.meta.updateTag({ name: 'description', content: 'Discover the best software training institute in Hyderabad at Ashok IT. Offering comprehensive courses in Java, Python, AWS, DevOps, and more. Get industry-ready with hands-on training and expert guidance.' });

    // Set meta keywords
    this.meta.updateTag({ name: 'keywords', content: 'Best Software Training Institute, Hyderabad, IT Courses, Full Stack Development, Java, Python, AWS, DevOps, Ashok IT' });
  }

  enroll(id: number) {
    this.router.navigate(['/student/course-details', id]);
  }

  getBatchesOpenForEnrollment() {
    this.dataLoaderService.getBatchesOpenForEnrollment().subscribe(
      (res) => {
        this.courses = res.data;
      },
      (error) => {
        console.error('Error fetching course:', error);
      }
    );
  }

  getAllTrainers() {
    this.dataLoaderService.getAllTrainers().subscribe(
      (res) => {
        this.trainers = res.data;
      },
      (error) => {
        console.error('Error fetching courses:', error);
      }
    );
  }

  getCourseCategories() {
    this.dataLoaderService.getCourseCategories().subscribe((res) => {
      this.courseCategories = res.data;
    });
  }

  getScheduledBatchesByCategoryId(courseCategoryId: any) {
    this.dataLoaderService
      .getScheduledBatchesByCategory(courseCategoryId)
      .subscribe((res) => {
        this.courses = res.data;
      });
  }

  getAllCourseByTrainer(trainer: any) {
    this.dataLoaderService
      .getAllCourseByTrainer(trainer.trainerId)
      .subscribe((res) => {
        this.courses = res.data;
      });
  }

  getAllCourseByClassType(classType: string) {
    this.dataLoaderService
      .getAllCourseByClassType(classType)
      .subscribe((res) => {
        this.courses = res.data;
      });
  }

  getCourseByCourseCategory(courseCategory: any) {
    this.dataLoaderService
      .getScheduledBatchesByCategory(courseCategory.courseCategoryId)
      .subscribe((res) => {
        this.courses = res.data;
      });
  }

  getScheduledBatchesByScheduleType(classType: string) {
    this.dataLoaderService
      .getScheduledBatchesByScheduleTypeForEnrollment(classType)
      .subscribe((res) => {
        this.courses = res.data;
      });
  }
  getStarArray(rating: number): number[] {
    return Array(rating)
      .fill(0)
      .map((x, i) => i);
  }
}
