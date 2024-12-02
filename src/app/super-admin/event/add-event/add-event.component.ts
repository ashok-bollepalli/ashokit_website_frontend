import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TrainerDTO } from 'src/app/dto/TrainerDTO';
import { EventService } from 'src/app/services/event.service';
import { TrainerService } from 'src/app/services/trainer.service';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { DataServiceService } from 'src/app/services/data-service.service';
import { EventCategoryDTO } from 'src/app/dto/EventCategoryDTO';
import { DataLoaderService } from 'src/app/services/data-loader.service';
import { UserStorageService } from 'src/app/services/user-storage.service';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit {
  public eventForm: FormGroup = this.formBuilder.group({});
  public trainer: TrainerDTO[] = [];
  public eventCategories: EventCategoryDTO[] = [];
  public eventThumbnailFile: File | null = null;
  public eventBannerFile: File | null = null;
  public Editor = ClassicEditor;

  constructor(
    private eventService: EventService,
    private router: Router,
    private trainerService: TrainerService,
    private formBuilder: FormBuilder,
    private toaster: ToastrService,
    private dataLoaderService: DataLoaderService,
    private userStorageService: UserStorageService
  ) { }

  ngOnInit(): void {
    this.eventForm = this.formBuilder.group({
      eventName: ['', Validators.required],
      eventDesc: ['', Validators.required],
      // eventCategory: ['', Validators.required],
      eventBenefits: [''],
      eventStartDate: ['', Validators.required],
      eventEndDate: ['', Validators.required],
      eventStartTime: ['', Validators.required],
      eventEndTime: ['', Validators.required],
      eventVenue: ['', Validators.required],
      eventHost: ['', Validators.required],
      eventThumbnail: ['', Validators.required],
      eventBanner: ['', Validators.required],
      startMeridianType:['', Validators.required],
      endMeridianType:['', Validators.required],
      eventCategoryId: ['', Validators.required],
      eventSlug: ['', Validators.required],
      eventRegLink: ['', Validators.required]

    });
    this.getAllTrainers();
    this.getEventCategories();
  }

  getEventCategories() {
    this.eventService.getEventCategories().subscribe((res) => {
      this.eventCategories = res.data;
     
    });
  }
  onSubmit(): void {
    console.log(this.eventForm)
    if (this.eventForm.valid && this.eventThumbnailFile && this.eventBannerFile) {
      const eventData = this.eventForm.value;
      this.eventService.addEvents(eventData, this.eventThumbnailFile, this.eventBannerFile).subscribe(
        (res: any) => {
          this.toaster.success('Event added successfully');
          if (this.userStorageService.getRole() == 'SUPERADMIN') {
            this.router.navigate(['/super-admin/event']);
          } else {
            this.router.navigate(['/admin/event']);
          }         
          
        },
        (error) => {
          console.error("Error:", error);
        }
      );
    } else {
      // Handle invalid form
    }
  }


  getAllTrainers() {
    this.trainerService.getAllTrainers().subscribe(
      res => {
        this.trainer = res.data;
        console.log('res', res)
      },
      error => { }
    )
  }

  onFileChange(event: any, fileType: string): void {
    const files: FileList = event.target.files;
    if (files.length > 0) {
      if (fileType === 'eventThumbnail') {
        this.eventThumbnailFile = files[0];
      } else if (fileType === 'eventBanner') {
        this.eventBannerFile = files[0];
      }
    }
  }

  
}

