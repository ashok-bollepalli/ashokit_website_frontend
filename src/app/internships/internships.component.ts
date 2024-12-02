import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CareerDTO } from '../dto/CareerDTO';
import { DataLoaderService } from '../services/data-loader.service';
import { JobPostingDTO } from '../dto/JobPostingDTO';

@Component({
  selector: 'app-internships',
  templateUrl: './internships.component.html',
  styleUrls: ['./internships.component.scss']
})
export class InternshipsComponent implements OnInit {
  public jobPostings: JobPostingDTO[] = [];


  constructor(private router: Router,
    private dataLoaderService: DataLoaderService
  ) { }

  ngOnInit(): void {
    this.getAllJobPostings('Internship');
  }
  applyNow() {
    this.router.navigate(['/internship-form']);
  }

  getAllJobPostings(jobTitle:string) {
    this.dataLoaderService.getJobPostingsByJobType(jobTitle).subscribe((res: any) => {
      this.jobPostings = res.data;
    },
      (error) => {
        console.log('Error fetching jobPostings: ', error);
      })
  }


}
