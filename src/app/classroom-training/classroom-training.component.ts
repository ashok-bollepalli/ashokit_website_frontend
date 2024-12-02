import { Component, OnInit } from '@angular/core';
import { ScheduleBatchDTO } from '../dto/ScheduleBatchDTO';
import { DataLoaderService } from '../services/data-loader.service';
import { CourseDTO } from '../dto/CourseDTO';
import { TrainerDTO } from '../dto/TrainerDTO';
import { BannerPromotionDTO } from '../dto/BannerPromotionDTO';

@Component({
  selector: 'app-classroom-training',
  templateUrl: './classroom-training.component.html',
  styleUrls: ['./classroom-training.component.scss']
})
export class ClassroomTrainingComponent implements OnInit {

  public bannerPromotions: BannerPromotionDTO[] = [];
  public classRoomTrainings: ScheduleBatchDTO[] = [];
  public courses: CourseDTO[] = [];
  public trainers: TrainerDTO[] = [];
  public trainerId: number = 1;
  public courseId: number = 1;

  constructor(
    private dataLoaderService: DataLoaderService
  ) {}
  

  ngOnInit(): void {
    this.getAllTrainingSchedules();
    this.getAllCourses();
    this.getAllTrainers();
    this.getAllBannerPromotions();
  }

  getAllTrainingSchedules() {
    const scheduleType: string = 'classRoomTraining.scheduleType'.toLowerCase();
    this.dataLoaderService.getAllTrainingSchedules(scheduleType).subscribe((res: any) => {
      this.classRoomTrainings = res.data;
    },
      (error) => {
        console.error('Error fetching trainingSchedules:', error);

      }
    )

  }

  getAllCourses() {
    this.dataLoaderService.getAllCourses().subscribe((res: any) => {
      this.courses = res.data;
    },
      (error) => {
        console.error('Error fetched courses:', error);
      }
    )
  }

  getAllTrainers() {
    this.dataLoaderService.getAllTrainers().subscribe((res: any) => {
      this.trainers = res.data;
    },
      (error) => {
        console.error('Error fetched trainers:', error);
      }
    )
  }

  getTrainerName(trainerId: number): string {
    const foundTrainer = this.trainers.find(trainer => trainer.trainerId === trainerId);
    if (foundTrainer) {
      return foundTrainer.trainerName;
    }
    else {
      return 'Unknown';
    }
  }

  getCourseName(courseId: number): string {
    const foundCourse = this.courses.find(course => course.courseId === courseId);
    if (foundCourse) {
      return foundCourse.courseName;
    }
    else {
      return 'Unknown';
    }
  }

  getAllBannerPromotions() {
    const displayBannerType: string = 'Class Room Training'.toLowerCase();
    this.dataLoaderService.getAllBannerPromotions(displayBannerType).subscribe((res: any) => {
      this.bannerPromotions = res.data;
    },
      (error) => {
        console.log('Error fetching bannerPromotions:', error);
      }
    )
  }
}
