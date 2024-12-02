import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CountryCodeDTO } from 'src/app/dto/CountryCodeDTO';
import { CourseCategoryDTO } from 'src/app/dto/CourseCategoryDTO';
import { CourseDTO } from 'src/app/dto/CourseDTO';
import { EnquiryDTO } from 'src/app/dto/EnquiryDTO';
import { TrainerDTO } from 'src/app/dto/TrainerDTO';
import { TrainingModesDTO } from 'src/app/dto/TrainingModesDTO';
import { EnquiryService } from 'src/app/services/Enquiry/enquiry.service';
import { CourseCategoryService } from 'src/app/services/course-category.service';
import { CourseServiceService } from 'src/app/services/course-service.service';
import { DataLoaderService } from 'src/app/services/data-loader.service';
import { TrainerService } from 'src/app/services/trainer.service';


@Component({
  selector: 'app-add-enquiry',
  templateUrl: './add-enquiry.component.html',
  styleUrls: ['./add-enquiry.component.scss']
})
export class AddEnquiryComponent implements OnInit {

  enquiryForm: FormGroup = this.formBuilder.group({});
  enquiries: EnquiryDTO[] = [];
  public courseCategories: CourseCategoryDTO[] = [];
  public courses: CourseDTO[] = [];
  public filteredCourses: CourseDTO[] = [];
  public trainers: TrainerDTO[] = [];
  trainingModes: TrainingModesDTO[] = [];
  public countryCodes: CountryCodeDTO[] = [];


  constructor(private formBuilder: FormBuilder,
    private sanitizer: DomSanitizer,
    private enquiryServive: EnquiryService,
    private courseCategoryService: CourseCategoryService,
    private courseService: CourseServiceService,
    private toasterService: ToastrService,
    private router: Router,
    private trainerService: TrainerService,
    private dataLoaderService: DataLoaderService
  ) { }
  

  ngOnInit(): void {
    this.enquiryForm = this.formBuilder.group({
      fullName: [''],
      email: [''],
      mobilNumber: [''],    
      countryCode:[''],
      comment: [''],
      trainingMode: [''],
      status: ['Open'],
      paymentStatus: [''],
      courseId: [''],
      courseCategoryId: [''],
      enqSource: ['']

    })
    this.getCourseCategories();
    this.getAllCourses();
    this.getTrainingModes();
    this.getAllCountryCodes();
  }


  sanitizeAboutCourseInput(htmlString: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(htmlString);

  }


  getCourseCategories() {
    this.courseCategoryService.getCourseCategories().subscribe(
      res => {
        this.courseCategories = res.data;
        console.log(this.courseCategories);
      },
      error => {

      }
    );
  }

  getAllCourses() {
    this.courseService.getAllCourses().subscribe(
      res => {
        this.courses = res.data;
        this.filteredCourses = res.data;
      },
      error => {
        console.error('Error fetching courses:', error);
      }
    );
  }

  onSubmit(): void {
    if (this.enquiryForm.valid) {
      const enquiryData = this.enquiryForm.value;
      this.enquiryServive.addEnquiry(enquiryData).subscribe(res => {
        this.router.navigate(['/counselor/view-enquiry']);
        this.toasterService.success('Success!', 'Coures Enquiry Submitted Successfully');

      }, error => {
        this.toasterService.error('Error!', 'Failed to Submit Coures Enquiry');
      });
    } else {
      this.toasterService.warning('Warning!', 'Please Fill in All Required Fields');
      }
     
   }
   
  

  filterCourseByCategory(){
    const enquiryData = this.enquiryForm.value;
    this.filteredCourses = this.courses.filter((course:CourseDTO) =>{
      return course.courseCategoryId == enquiryData.courseCategoryId;
    })
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
  getAllCountryCodes() {
    this.enquiryServive.getAllCountryCodes().subscribe(res => {
      this.countryCodes = res.data;
    })
  }

}
