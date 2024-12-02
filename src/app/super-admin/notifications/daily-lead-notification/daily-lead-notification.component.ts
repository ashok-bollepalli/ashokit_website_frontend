import { Component, OnInit } from '@angular/core';
import { CourseCategoryDTO } from 'src/app/dto/CourseCategoryDTO';
import { CourseDTO } from 'src/app/dto/CourseDTO';
import { NotificationService } from 'src/app/services/notifications/notification.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-daily-lead-notification',
  templateUrl: './daily-lead-notification.component.html',
  styleUrls: ['./daily-lead-notification.component.scss']
})
export class DailyLeadNotificationComponent implements OnInit {


  dailyLeadsNotificationForm: FormGroup = this.formBuilder.group({});

  public courseCategories: CourseCategoryDTO[] = [];
  public courses: CourseDTO[] = [];
  public selectedCourses: any[] = [];
  public courseId!: number ;
  public categoryId!: number ;
  public watiTemplates: any;

  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.dailyLeadsNotificationForm = this.formBuilder.group({
      categoryId: [''],
      courseId: [''],
      fromDate: [],
      templateName: ['']      
    });
    this.getCourseCategories();
    this.getAllCourses();
    this.getTemplateMessages();
    this.selectedCourses = this.courses;
  }

  getAllCourses() {
    this.notificationService.getAllCourses().subscribe((res: any) => {
      this.courses = res.data;
      this.selectedCourses = res.data;
    },
      (error) => {
        console.log('Error fetching courses:', error);
      }
    )
  }

  getCourseCategories() {
    this.notificationService.getCourseCategories().subscribe((res: any) => {
      this.courseCategories = res.data;
    },
      (error) => {
        console.log('Error fetching courseCategories:', error);
      }
    )
  }
  getTemplateMessages() {
    this.notificationService.getTemplateMessages().subscribe((res: any) => {
      this.watiTemplates = res.data;
    })
  }
  onSubmit() {
    console.log("form : "+ this.dailyLeadsNotificationForm.value);
    this.notificationService.sendWatiSMSForDailyLeads(this.dailyLeadsNotificationForm.value).subscribe((res: any) => {       
        this.toastrService.success('Notification sent successfully!');
      },
        (error: any) => {
          console.error('Error sending notification:', error);
          this.toastrService.error('Failed to send notification. Please try again.');
        }
      );
  }
  findCourseByCategory(e: any) {
    this.selectedCourses = this.courses.filter(data => data.courseCategoryId == e.target.value);
  }
}