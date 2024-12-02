import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentJobsDTO } from 'src/app/dto/StudentJobsDTO';
import { DataServiceService } from 'src/app/services/data-service.service';
import { StudentJobsService } from 'src/app/services/student-jobs.service';

@Component({
  selector: 'app-edit-student-jobs',
  templateUrl: './edit-student-jobs.component.html',
  styleUrls: ['./edit-student-jobs.component.scss']
})
export class EditStudentJobsComponent implements OnInit {
  public studentJob!: StudentJobsDTO;
  fullname: string ='';

  constructor(
    private router: Router,
    private dataServiceService: DataServiceService,
    private studentJobsservice: StudentJobsService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.studentJob = this.dataServiceService.studentJobsData;
    
  }

  onSubmit(): void {
    if (this.studentJob) {
      this.studentJob = this.dataServiceService.studentJobsData;
      this.studentJobsservice.updateStudentJobs(this.studentJob).subscribe(
        (res: any) => {
          this.router.navigate(['/counselor/student-jobs']);
        },
        (error) => {
          console.error("Error:", error);
        }
      );
    } else {
     
    }
  }

}
