import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { JobPostingDTO } from 'src/app/dto/JobPostingDTO';
import { DataServiceService } from 'src/app/services/data-service.service';
import { StudentJobsService } from 'src/app/services/student-jobs.service';
import { UserStorageService } from 'src/app/services/user-storage.service';

@Component({
  selector: 'app-view-job-postings',
  templateUrl: './view-job-postings.component.html',
  styleUrls: ['./view-job-postings.component.scss']
})
export class ViewJobPostingsComponent implements OnInit {

  public jobPostings: JobPostingDTO[] = [];
  public filteredJobPostings: JobPostingDTO[] = [];
  public pageSize: number = 5;
  public currentPage: number = 1;
  public totalItems: number = this.filteredJobPostings.length;



  constructor(
    private router: Router,
    private studentJobService: StudentJobsService,
    private userStorageService: UserStorageService,
    private dataService: DataServiceService,
    private toaster: ToastrService
  ) { }

  ngOnInit(): void {
    this.getAlljobPostings();
  }

  addjobManagement() {
    this.router.navigate(['admin/jobs-management']);
  }

  getAlljobPostings() {
    this.studentJobService.getAlljobPostings().subscribe(
      res => {
        this.filteredJobPostings = res.data;
        this.jobPostings = res.data;

      },
      error => {
        console.error('Error fetching courses:', error);
      }
    );
  }


  editJobPosting(jobPosting: JobPostingDTO) {
    this.dataService.jobPostingData = jobPosting;
    this.router.navigate(['/admin/update-job-posting']);
  }
  deleteJobPostings(id: number) {
    this.studentJobService.deleteJobPostings(id).subscribe(
      res => {
        this.getAlljobPostings();
        this.toaster.success("deleted successfully");
      }
    );
  }

  calculateTotalPages() {
    if (this.filteredJobPostings) {
      this.totalItems = this.filteredJobPostings.length;
    } else {
      this.totalItems = 0;
    }
  }
  getPageArray(): number[] {
    return Array.from({ length: this.getTotalPages() }, (_, index) => index + 1);
  }
  getTotalPages(): number {
    this.calculateTotalPages();
    return Math.ceil(this.totalItems / this.pageSize);
  }
  onPageChange(page: number) {
    this.currentPage = page;
  }

}
