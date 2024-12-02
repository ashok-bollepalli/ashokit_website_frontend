import { Component } from '@angular/core';
import { ScheduleBatchDTO } from '../dto/ScheduleBatchDTO';
import { CourseDTO } from '../dto/CourseDTO';
import { TrainerDTO } from '../dto/TrainerDTO';
import { BannerPromotionDTO } from '../dto/BannerPromotionDTO';
import { DataLoaderService } from '../services/data-loader.service';
import { TrainingModesDTO } from '../dto/TrainingModesDTO';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-training-schedule',
  templateUrl: './training-schedule.component.html',
  styleUrls: ['./training-schedule.component.scss']
})
export class TrainingScheduleComponent {
  public trainings: ScheduleBatchDTO[] = [];
  public trainingModes: TrainingModesDTO[] = [];
  public courses: CourseDTO[] = [];
  public trainers: TrainerDTO[] = [];
  public courseId: number = 1;
  public trainerId: number = 1;
  public bannerPromotions: BannerPromotionDTO[] = [];
  activeTab: string = 'Online';

  constructor(
    private dataLoaderService: DataLoaderService,
    private meta: Meta, private titleService: Title
  ) { }

  ngOnInit(): void {
    this.setMetaTags();
    this.getTrainingSchedules('Online');
    this.getTrainingModes();
    this.getAllCourses();
    this.getAllTrainers();
    this.getAllBannerPromotions('Online');
  }

  setMetaTags() {
    // Set the title
    this.titleService.setTitle('Python Course in Hyderabad | Master Python Programming with Ashok IT');

    // Set meta description
    this.meta.updateTag({ name: 'description', content: 'Enroll in Ashok IT Python course in Hyderabad. Learn Python programming from experts with hands-on projects and job assistance.' });

    // Set meta keywords
    this.meta.updateTag({ name: 'keywords', content: 'Python Course in Hyderabad, Python Training Hyderabad, Learn Python, Ashok IT Python' });
  }


  getTrainingModes() {
    this.dataLoaderService.getTrainingModes().subscribe(res => {
        this.trainingModes = res.data;
      },
      error => {
        console.error('Error fetching scheduleTypes:', error);
      }
    );
  }

  getTrainingSchedules(scheduleType:string) {
    this.dataLoaderService.getAllTrainingSchedules(scheduleType).subscribe((res: any) => {
      this.trainings = res.data;
    },
      (error) => {
        console.log('Error fetching trainingSchedules:', error);
      }
    )
  }

  
  selectTab(tab: string) {
    this.activeTab = tab;
    this.getAllBannerPromotions(tab);
    this.getTrainingSchedules(tab);
  }
  getAllCourses() {
    this.dataLoaderService.getAllCourses().subscribe(res => {
      this.courses = res.data;
    },
      error => {
        console.error('Error fetching courses:', error);
      }
    );
  }

  getAllTrainers() {
    this.dataLoaderService.getAllTrainers().subscribe((res: any) => {
      this.trainers = res.data;
    },
      (error) => {
        console.error('Error fetching trainers:', error);
      }
    )
  }


  getTrainerName(trainerId: number): string {
    const foundTrainer = this.trainers.find(trainer => trainer.trainerId === trainerId);
    if (foundTrainer) {
      return foundTrainer.trainerName;
    } else {
      return 'Unknown';
    }
  }

  getCourseName(courseId: number): string {
    const foundCourse = this.courses.find(course => course.courseId === courseId);
    if (foundCourse) {
      return foundCourse.courseName;
    } else {
      return 'Unknown';
    }
  }

  getAllBannerPromotions(displayBannerType:string) {
    this.dataLoaderService.getAllBannerPromotions(displayBannerType.toLowerCase()).subscribe((res: any) => {
      this.bannerPromotions = res.data;
    },
      (error) => {
        console.log('Error fetching bannerPromotions:', error);
      }
    )
  }
  
}
