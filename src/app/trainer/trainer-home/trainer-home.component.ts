import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BannerDTO } from 'src/app/dto/BannerDTO';
import { BatchDTO } from 'src/app/dto/BatchDTO';
import { ClientDTO } from 'src/app/dto/ClientDTO';
import { CourseDTO } from 'src/app/dto/CourseDTO';
import { TestimonialDTO } from 'src/app/dto/TestimonialDTO';
import { BatchesScheduleService } from 'src/app/services/batches-schedule.service';
import { CourseServiceService } from 'src/app/services/course-service.service';
import { DataLoaderService } from 'src/app/services/data-loader.service';
import { DataServiceService } from 'src/app/services/data-service.service';
import { DataSharingService } from 'src/app/services/sharing/data-sharing.service';

@Component({
  selector: 'app-trainer-home',
  templateUrl: './trainer-home.component.html',
  styleUrls: ['./trainer-home.component.scss']
})
export class TrainerHomeComponent {


  url1: string = "../../assets/images/spring-boot-microservices-online-training.jpeg";
  url2: string = "../../assets/images/java-realtime-project-online-training.png";
  url3: string = "../../assets/images/java-fullstack-development-online-training.jpeg";
  url4: string = "../../assets/images/devops-with-aws-online-training.jpeg";


  course!: CourseDTO;
  public courses: CourseDTO[] = [];
  public banners: BannerDTO[] = [];
  public isChatBoxEnable: boolean = false;
  public clients: ClientDTO[] = [];
  public testimonials: TestimonialDTO[] = [];


  constructor(
    private dataSharingService: DataSharingService,
    private dataLoaderService: DataLoaderService,
    private router: Router,
    private dataServiceService: DataServiceService

  ) { }
  ngOnInit(): void {
    this.getAllCourses();
    this.getAllBanners();
    this.getAllClients();
    this.getAllTestimonials();
  }
  getAllCourses(): void {
    this.dataLoaderService.getAllCourses().subscribe(
      res => {
        this.courses = res.data;;
      },
      error => {
        console.error('Error fetching course:', error);
      }
    );


  }
  edit(course: CourseDTO) {
    this.dataServiceService.courseData = course;
    //  this.router.navigate(['/view-details']);
    this.router.navigate(['/view-details']);
  }

  getAllBanners() {
    this.dataLoaderService.getAllBanners().subscribe((res: any) => {
      this.banners = res.data;
    },
      (error) => {
        console.log('Error fetching banners:', error);
      }
    )
  }

  logoSrc = 'https://cdn.clare.ai/wati/images/WATI_logo_square_2.png';

  handleError() {
    this.logoSrc = 'https://cdn.clare.ai/wati/images/WATI_logo_square_2.png';
  }

  messageUs() {
    this.isChatBoxEnable = true;
  }

  closePopup() {
    console.log('Closing chatbox...');
    this.isChatBoxEnable = false;
    console.log('Chatbox closed:', this.isChatBoxEnable);
  }
  
  

  scrollTo(identification: string) {
    this.dataSharingService.scrollTo(identification)
  }

  getAllClients() {
    this.dataLoaderService.getAllClients().subscribe((res: any) => {
      this.clients = res.data;
    },
      (error) => {
        console.log('Error fetching clients:', error);
      }
    )
  }

  getAllTestimonials() {
    this.dataLoaderService.getAllTestimonials().subscribe((res: any) => {
      this.testimonials = res.data;
    },
      (error) => {
        console.log('Error fetching testimonials:', error);
      }
    )
  }
}
