import { Component, OnInit } from '@angular/core';
import { DataLoaderService } from '../services/data-loader.service';
import { ScheduleBatchDTO } from '../dto/ScheduleBatchDTO';
import { CourseDTO } from '../dto/CourseDTO';
import { TrainerDTO } from '../dto/TrainerDTO';
import { CourseServiceService } from '../services/course-service.service';
import { BannerPromotionDTO } from '../dto/BannerPromotionDTO';


@Component({
  selector: 'app-online-training',
  templateUrl: './online-training.component.html',
  styleUrls: ['./online-training.component.scss']
})
export class OnlineTrainingComponent implements OnInit {
  public onlineTrainings: ScheduleBatchDTO[] = [];
  public courses: CourseDTO[] = [];
  public trainers: TrainerDTO[] = [];
  public courseId: number = 1;
  public trainerId: number = 1;
  public bannerPromotions: BannerPromotionDTO[] = [];

  constructor(
    private dataLoaderService: DataLoaderService
  ) { }

  ngOnInit(): void {
    this.getAllTrainingSchedules();
    this.getAllCourses();
    this.getAllTrainers();
    this.getAllBannerPromotions();
  }

  getAllTrainingSchedules() {

    const scheduleType: string = 'onlineTraining.scheduleType'.toLowerCase();
    this.dataLoaderService.getAllTrainingSchedules(scheduleType).subscribe((res: any) => {
      this.onlineTrainings = res.data;
    },
      (error) => {
        console.error('Error fetching trainingSchedules:', error);
      }
    )
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
      console.log('Found Trainer:', foundTrainer);
      return foundTrainer.trainerName;
    } else {
      console.log('Trainer not found for ID:', trainerId);
      return 'Unknown';
    }
  }

  getCourseName(courseId: number): string {
    const foundCourse = this.courses.find(course => course.courseId === courseId);
    if (foundCourse) {
      console.log('Found Course:', foundCourse);
      return foundCourse.courseName;
    } else {
      console.log('Course not found for ID:', courseId);
      return 'Unknown';
    }
  }

  getAllBannerPromotions() {
    const displayBannerType: string = 'Online Training'.toLowerCase();
    this.dataLoaderService.getAllBannerPromotions(displayBannerType).subscribe((res: any) => {
      this.bannerPromotions = res.data;
    },
      (error) => {
        console.log('Error fetching bannerPromotions:', error);
      }
    )
  }

}
