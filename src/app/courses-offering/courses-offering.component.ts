import { Component, OnInit } from '@angular/core';
import { CourseServiceService } from '../services/course-service.service';
import { DataLoaderService } from '../services/data-loader.service';
import { CourseCategoryDTO } from '../dto/CourseCategoryDTO';
import { CourseDTO } from '../dto/CourseDTO';
import { DataServiceService } from '../services/data-service.service';
import { Router } from '@angular/router';
import { TrainerDTO } from '../dto/TrainerDTO';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-courses-offering',
  templateUrl: './courses-offering.component.html',
  styleUrls: ['./courses-offering.component.scss']
})
export class CoursesOfferingComponent implements OnInit {


  course!: CourseDTO;
  public courses: any[] = [];
  courseCategories: CourseCategoryDTO[] = [];
  //public trainers: TrainerDTO[] = [];

  public activeTab: string = 'All';

  constructor(
    private courseService: CourseServiceService,
    private dataLoaderService: DataLoaderService,
    private dataService: DataServiceService,
    private router: Router,
    private meta: Meta, private titleService: Title


  ) { }



  getAllCourses(all: string) {
    this.dataLoaderService.getAllCourses().subscribe(
      res => {
        this.courses = res.data;
        this.selectTab('All');
      },
      error => {
        console.error('Error fetching course:', error);
      }
    );

  }

  ngOnInit(): void {
    this.setMetaTags();
    this.getCourseCategories();
    this.getAllCourses('All');
    this.courses = this.dataService.courseDatas;

  }

  setMetaTags() {
    // Set the title
    this.titleService.setTitle('Best Software Training Institute in Hyderabad | Software Training & Full Stack Development Courses');

    // Set meta description
    this.meta.updateTag({ name: 'description', content: 'Discover the best software training institute in Hyderabad at Ashok IT. Offering comprehensive courses in Java, Python, AWS, DevOps, and more. Get industry-ready with hands-on training and expert guidance.' });

    // Set meta keywords
    this.meta.updateTag({ name: 'keywords', content: 'Best Software Training Institute, Hyderabad, IT Courses, Full Stack Development, Java, Python, AWS, DevOps, Ashok IT' });
  }

  selectTab(tab: string) {
    this.activeTab = tab;
  }

  getCourseCategories() {
    this.dataLoaderService.getCourseCategories().subscribe((res) => {
      this.courseCategories = res.data;
      //  this.activeTab =  this.courseCategories[0].courseCategoryName;
    });
  }

  getCourseByCourseCategory(courseCategory: any) {
    this.dataLoaderService.getCourseByCourseCategory(courseCategory.courseCategoryId).subscribe((res) => {
      this.courses = res.data;
    });
    this.selectTab(courseCategory.courseCategoryName);
  }

  edit(course: CourseDTO) {
    this.dataLoaderService.courseData = course;
    //  this.router.navigate(['/view-details']);
    this.router.navigate([`/courses/${course.courseUrl}`]);
  }
  // getAllCourseByTrainer(trainer:any){
  //   this.dataLoaderService. getAllCourseByTrainer(trainer.trainerId).subscribe((res) => {
  //     this.courses = res.data;
  //   });
  // }
  getStarArray(rating: number): number[] {
    return Array(rating).fill(0).map((x, i) => i);
  }

}
