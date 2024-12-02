import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { DataSharingService } from './sharing/data-sharing.service';
import { Router } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit{

  constructor(private dataSharingService: DataSharingService,
    private router: Router,
    private meta: Meta, private titleService: Title
  ) {
    this.dataSharingService.scrollRequest.subscribe((p: string) => {
      this.scrollTo(p)
    })
  }

  ngOnInit(): void {
    this.setMetaTags();
  }

  
  setMetaTags() {
    // Set the title
    this.titleService.setTitle('Java Full Stack Developer Course in Hyderabad | Ashok IT');

    // Set meta description
    this.meta.updateTag({ name: 'description', content: 'Master Java Full Stack Development in Hyderabad with Ashok IT. Learn Java, Spring Boot, Microservices, Angular, and more with hands-on projects and expert trainers. Enroll now for career growth!' });

    // Set meta keywords
    this.meta.updateTag({ name: 'keywords', content: 'Java Full Stack Developer Course, Hyderabad, Java Training, Spring Boot, Angular, Full Stack Development, IT Courses, Ashok IT' });
  }


  scrollTo(targetPara: string): void {
    setTimeout(() => {
      document.getElementById(targetPara)?.scrollIntoView({ behavior: 'smooth' })
    }, 200)
  }


  onlineExplore() {
    this.router.navigate(['/training-schedule']);
  }


  classRoomExplore() {
    this.router.navigate(['/training-schedule']);
  }

  corporeteExplore() {
    this.router.navigate(['/training-schedule']);
  }

  internshipExplore() {
    this.router.navigate(['/internships']);
  }


}
