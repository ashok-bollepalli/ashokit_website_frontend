import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CourseServiceService } from 'src/app/services/course-service.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent implements OnInit {
  public coursesCount: number = 0;

  constructor(
    private router: Router,
    private courseServiceService: CourseServiceService
  ) { }

  ngOnInit(): void {
    this.courseServiceService.getCoursesCount().subscribe(res => {
      this.coursesCount = res
    },
      (error) => {

      }
    )
  }

  navigateToCourses() {
    this.router.navigate(['/admin/view-courses']);
  }

  reloadPage(): void {
    window.location.reload();
  }

  reloadCurrentRoute() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }
}
