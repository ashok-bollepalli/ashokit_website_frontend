import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { JobPostingDTO } from 'src/app/dto/JobPostingDTO';
import { DataServiceService } from 'src/app/services/data-service.service';
import { StudentJobsService } from 'src/app/services/student-jobs.service';

@Component({
  selector: 'app-updat-job-posting',
  templateUrl: './updat-job-posting.component.html',
  styleUrls: ['./updat-job-posting.component.scss']
})
export class UpdatJobPostingComponent implements OnInit {

  public jobPostings!: JobPostingDTO;

  constructor(
    private dataServiceService: DataServiceService,
    private router: Router,
    private toaster: ToastrService,
    private studentJobService: StudentJobsService
  ) { }

  ngOnInit(): void {
    this.jobPostings = this.dataServiceService.jobPostingData;
    this.getAlljobPostings();
  }

  getAlljobPostings() {
    this.studentJobService.getAlljobPostings().subscribe(
      res => {
        this.jobPostings = res.data;

      },
      error => {
        console.error('Error fetching courses:', error);
      }
    );
  }

  onSubmit() {
    if (this.jobPostings) {
      this.studentJobService.updateJobPostings( this.jobPostings).subscribe(
        (res: any) => {
          this.router.navigate(['/counselor/student-jobs']);
        },
        (error) => {
          console.error('Error:', error);
        }
      );
    } else {
      console.error('Job posting data or ID is missing');
    }
  }
}
