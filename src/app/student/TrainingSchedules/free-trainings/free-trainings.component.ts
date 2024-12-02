import { Component } from '@angular/core';
import { BannerPromotionDTO } from 'src/app/dto/BannerPromotionDTO';
import { CourseDTO } from 'src/app/dto/CourseDTO';
import { ScheduleBatchDTO } from 'src/app/dto/ScheduleBatchDTO';
import { TrainerDTO } from 'src/app/dto/TrainerDTO';
import { DataLoaderService } from 'src/app/services/data-loader.service';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-free-trainings',
  templateUrl: './free-trainings.component.html',
  styleUrls: ['./free-trainings.component.scss']
})
export class FreeTrainingsComponent {
  public bannerPromotions: BannerPromotionDTO[] = [];
  public freeTrainings: ScheduleBatchDTO[] = [];
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
    const scheduleType: string = 'freeTraining.scheduleType'.toLocaleLowerCase();
    this.dataLoaderService.getAllTrainingSchedules(scheduleType).subscribe((res: any) => {
      this.freeTrainings = res.data;
    },
      (error) => {
        console.log('Error fetching trainingSchedules:', error);
      }
    )
  }

  getAllCourses() {
    this.dataLoaderService.getAllCourses().subscribe((res: any) => {
      this.courses = res.data;
    },
      (error) => {
        console.log('Error fetching courses:', error);
      }
    )
  }

  getAllTrainers() {
    this.dataLoaderService.getAllTrainers().subscribe((res: any) => {
      this.trainers = res.data;
    },
      (error) => {
        console.log('Error fetching trainers', error);
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
      console.log('Course not found for ID:', courseId);
      return 'Unknown';
    }
  }

  getAllBannerPromotions() {
    const displayBannerType: string = 'Free Training'.toLowerCase();
    this.dataLoaderService.getAllBannerPromotions(displayBannerType).subscribe((res: any) => {
      this.bannerPromotions = res.data;
    },
      (error) => {
        console.log('Error fetching bannerPromotions:', error);
      }
    )
  }
}