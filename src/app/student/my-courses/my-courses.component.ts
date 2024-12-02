import { SocialUser } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseDTO } from 'src/app/dto/CourseDTO';
import { ScheduleBatchDTO } from 'src/app/dto/ScheduleBatchDTO';
import { StudentViewNotesDTO } from 'src/app/dto/StudentViewNotesDTO';
import { CoursePaymentService } from 'src/app/services/coursepayment/course-payment.service';
import { DataLoaderService } from 'src/app/services/data-loader.service';
import { UserStorageService } from 'src/app/services/user-storage.service';

@Component({
  selector: 'app-my-courses',
  templateUrl: './my-courses.component.html',
  styleUrls: ['./my-courses.component.scss']
})
export class MyCoursesComponent implements OnInit {
  classNotes:StudentViewNotesDTO[]=[];
  batches: ScheduleBatchDTO[]=[];
  socialUser!:SocialUser | null;
  studentEmail!:string | null;
  batchCode!: string ;

  constructor(
    private route: ActivatedRoute,
    private coursePaymentService: CoursePaymentService,
    private userStorageService: UserStorageService,
    private dataLoaderService:DataLoaderService,
    private meta: Meta, private titleService: Title,
    private router: Router
    
  ) {}

  ngOnInit(): void {
    this.setMetaTags();
    this.socialUser = this.userStorageService.getSocialUser();
    this.studentEmail = this.socialUser ? this.socialUser.email : null;
    if(!this.studentEmail){
      this.studentEmail = this.userStorageService.getStudent().studentEmail;
    }
    if (this.studentEmail) {
      this.coursePaymentService.getCoursesByStudentEmail(this.studentEmail).subscribe(res=>{
        this.batches =  res.data;
      });
    }
    //this.getAllBatchCodeWithClassNotes(this.batchCode);
  }

  setMetaTags() {
    // Set the title
    this.titleService.setTitle('Best Software Training Institute in Hyderabad | Ashok IT');

    // Set meta description
    this.meta.updateTag({ name: 'description', content: 'Discover the best software training institute in Hyderabad at Ashok IT. Offering comprehensive courses in Java, Python, AWS, DevOps, and more. Get industry-ready with hands-on training and expert guidance.' });

    // Set meta keywords
    this.meta.updateTag({ name: 'keywords', content: 'Best Software Training Institute, Hyderabad, IT Courses, Full Stack Development, Java, Python, AWS, DevOps, Ashok IT' });
  }

  viewNotes( batchCode:string) {
    this.router.navigate(['/student/class-information', batchCode]);
  }
  getAllBatchCodeWithClassNotes(batchCode: string) {
    this.dataLoaderService.getAllBatchCodeWithClassNotes(batchCode).subscribe(
      (res: any) => {
        this.classNotes = res.data;
      },
      (error) => {
        console.error('Error fetching class notes:', error);
      }
    );
  }
}
