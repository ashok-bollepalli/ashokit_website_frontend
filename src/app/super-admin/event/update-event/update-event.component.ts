import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EventDTO } from 'src/app/dto/EventDTO';
import { TrainerDTO } from 'src/app/dto/TrainerDTO';
import { DataServiceService } from 'src/app/services/data-service.service';
import { EventService } from 'src/app/services/event.service';
import { TrainerService } from 'src/app/services/trainer.service';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { UserStorageService } from 'src/app/services/user-storage.service';

@Component({
  selector: 'app-update-event',
  templateUrl: './update-event.component.html',
  styleUrls: ['./update-event.component.scss']
})
export class UpdateEventComponent {
  trainer: TrainerDTO[] = [];
  public event!: EventDTO;
  eventForm: FormGroup = this.formBuilder.group({});
  public Editor = ClassicEditor;

  public eventThumbnailFile!: File ;
  public eventBannerFile!: File;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private dataService: DataServiceService,
    private trainerService: TrainerService,
    private activatedRoute: ActivatedRoute,
    private eventService: EventService,
    private userStorageService: UserStorageService,
    private toaster: ToastrService

  ) { }

  ngOnInit(): void {
    this.event = this.dataService.eventData;
    this.eventForm = this.formBuilder.group({
      eventId: [this.event?.eventId || 0],
      eventName: [this.event?.eventName || '', Validators.required],
      eventDesc: [this.event?.eventDesc || '', Validators.required],
      eventBenefits: [this.event?.eventBenefits || ''],
      eventCategory: [this.event?.eventCategory || '', Validators.required],
      eventStartDate: [this.event?.eventStartDate || '', Validators.required],
      eventEndDate: [this.event?.eventEndDate || '', Validators.required],
      eventStartTime: [this.event?.eventStartTime || '', Validators.required],
      eventEndTime: [this.event?.eventEndTime || '', Validators.required],
      eventVenue: [this.event?.eventVenue || '', Validators.required],
      eventHost: [this.event?.eventHost || '', Validators.required],
      eventRegLink: [this.event?.eventRegLink || '', Validators.required],
      eventThumbnail: [this.event?.eventThumbnail || ''],
      eventBanner: [this.event?.eventBanner || '']
    });
    this.getAllTrainers();
  }


  onSubmit() {
    if (this.eventForm.valid) {
      const eventData = this.eventForm.value;
      this.eventService.updateEvents(eventData, this.eventThumbnailFile, this.eventBannerFile).subscribe(
        (res: any) => {
          this.toaster.success('Data Updated Successfully');


          if (this.userStorageService.getRole() == 'SUPERADMIN') {
            this.router.navigate(['/super-admin/event']);
          } else {
            this.router.navigate(['/admin/event']);
          }


        },
        (error: any) => {
          console.error("Error:", error);
        }
      );
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
  updateEvents() {
    this.router.navigate(['/super-admin/event']);
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
