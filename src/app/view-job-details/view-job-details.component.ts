import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataLoaderService } from '../services/data-loader.service';

@Component({
  selector: 'app-view-job-details',
  templateUrl: './view-job-details.component.html',
  styleUrls: ['./view-job-details.component.scss']
})
export class ViewJobDetailsComponent implements OnInit {

  jobSlug: string | null = null;
  public job: any;


  ngOnInit(): void {
    this.jobSlug = this.route.snapshot.paramMap.get('jobSlug');
    this.getJobPostingBySlug(this.jobSlug!);
  }

  constructor(
    private dataLoaderService: DataLoaderService,
    private route: ActivatedRoute) {

  }

  getJobPostingBySlug(jobSlug: string) {
    this.dataLoaderService.getJobPostingBySlug(jobSlug).subscribe(res => {
      this.job = res.data;
    })
  }

}
