import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataLoaderService } from '../services/data-loader.service';
import { CareerDTO } from '../dto/CareerDTO';
import { JobPostingDTO } from '../dto/JobPostingDTO';
import { Meta, Title } from '@angular/platform-browser';
@Component({
  selector: 'app-placements',
  templateUrl: './placements.component.html',
  styleUrls: ['./placements.component.scss']
})
export class PlacementsComponent implements OnInit {
  public jobPostings: JobPostingDTO[] = [];

  constructor(private router: Router,
    private dataLoaderService: DataLoaderService,
    private meta: Meta, private titleService: Title
  ) { }

  ngOnInit(): void {
    // this.getAllCareers();
    this.setMetaTags();
    this.getAllJobPostings('Job');
  }

  setMetaTags() {
    // Set the title
    this.titleService.setTitle('Java Fullstack Course in Hyderabad | Master Java Fullstack with Expert Training');

    // Set meta description
    this.meta.updateTag({ name: 'description', content: 'Enroll in the best Java Fullstack course in Hyderabad and gain expertise in Java programming. Our course offers comprehensive training from basics to advanced concepts, hands-on projects, and job placement assistance.' });

    // Set meta keywords
    this.meta.updateTag({ name: 'keywords', content: 'Java Fullstack Course Hyderabad, Java Programming Training, Java Classes Hyderabad, Learn Java in Hyderabad, Java Certification Course, Java Programming Course Hyderabad, Best Java Course Hyderabad' });
  }


  

  applyNow(jobPosting:any) {
    console.log("slug :: "+ jobPosting.slug);
    this.router.navigate(['/software-jobs/'+jobPosting.slug]);
  }

  getAllJobPostings(jobType:string) {
    this.dataLoaderService.getJobPostingsByJobType(jobType).subscribe((res: any) => {
      this.jobPostings = res.data;
    },
      (error) => {
        console.log('Error fetching jobPostings: ', error);
      })
  }

}
