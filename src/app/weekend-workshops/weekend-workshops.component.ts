import { Component, OnInit } from '@angular/core';
import { ScheduleBatchDTO } from '../dto/ScheduleBatchDTO';
import { DataLoaderService } from '../services/data-loader.service';
import { CourseDTO } from '../dto/CourseDTO';
import { TrainerDTO } from '../dto/TrainerDTO';
import { BannerPromotionDTO } from '../dto/BannerPromotionDTO';

@Component({
  selector: 'app-training-schedules',
  templateUrl: './weekend-workshops.component.html',
  styleUrls: ['./weekend-workshops.component.scss']
})
export class WeekendWorkshopsComponent implements OnInit {

  public bannerPromotions: BannerPromotionDTO[] = [];
  public workshops: ScheduleBatchDTO[] = [];
  public courses: CourseDTO[] = [];
  public trainers: TrainerDTO[] = [];
  public trainerId: number = 1;
  public courseId: number = 1;

  constructor(
    private dataloaderService: DataLoaderService
  ) {}

  ngOnInit(): void {
    this.getAllTrainingSchedules();
    this.getAllCourses();
    this.getAllTrainers();
    this.getAllBannerPromotions();
  }

  getAllTrainingSchedules() {
    const scheduleType: string = 'workshop.scheduleType'.toLocaleLowerCase();
    this.dataloaderService.getAllTrainingSchedules(scheduleType).subscribe((res: any) => {
      this.workshops = res.data;
    },
      (error) => {
        console.log('Error fetching trainingSchedules:', error);
      }
    )
  }

  getAllCourses() {
    this.dataloaderService.getAllCourses().subscribe((res: any) => {
      this.courses = res.data;
    },
      (error) => {
        console.log('Error fetching courses:', error);
      }
    )
  }

  getAllTrainers() {
    this.dataloaderService.getAllTrainers().subscribe((res: any) => {
      this.trainers = res.data;
    },
      (error) => {
        console.log('Error fetching trainers:', error);
      }
    )
  }

  getTrainerName(trainerId: number): string {
    const foundTrainer = this.trainers.find(trainer => trainer.trainerId === trainerId);
    if (foundTrainer) {
      console.log('Found Trainer:', foundTrainer);
      return foundTrainer.trainerName;
    } else {
      console.log('Tainer not found for ID:', trainerId);
      return 'Unknown';
    }
  }

  getCourseName(courseId: number): string {
    const foundCourse = this.courses.find(course => course.courseId === courseId);
    if (foundCourse) {
      console.log('Found Course:', foundCourse);
      return foundCourse.courseName;
    } else {
      console.log('Course not found for ID:', foundCourse);
      return 'Unknown;'
    }
  }

  getAllBannerPromotions() {
    const displayBannerType: string = 'Weekend Workshops'.toLocaleLowerCase();
    this.dataloaderService.getAllBannerPromotions(displayBannerType).subscribe((res: any) => {
      this.bannerPromotions = res.data;
    },
      (error) => {
        console.log('Error fetching bannerPromotions:', error);
      }
    )
  }

}
