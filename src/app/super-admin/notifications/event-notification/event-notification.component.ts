import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { EventCategoryDTO } from 'src/app/dto/EventCategoryDTO';
import { EventDTO } from 'src/app/dto/EventDTO';
import { EventService } from 'src/app/services/event.service';
import { NotificationService } from 'src/app/services/notifications/notification.service';

@Component({
  selector: 'app-event-notification',
  templateUrl: './event-notification.component.html',
  styleUrls: ['./event-notification.component.scss']
})
export class EventNotificationComponent implements OnInit {
  public events: EventDTO[] = [];
  public selectedEvents: EventDTO[] = [];
  public eventCategories: EventCategoryDTO[] = [];
  public watiTemplates: any;
  elementName!: string;
  eventCategoryId!: string;
  eventId!: number;
  ngOnInit(): void {
    this.getAllEvents();
    this.getTemplateMessages();
    this.getEventCategories();
  }

  constructor(
    private toastrService: ToastrService,
    private eventService: EventService,
    private notificationService: NotificationService
  ) { }

  getAllEvents() {
    this.eventService.getAllEvents().subscribe(res => {
      this.events = res.data;
      this.selectedEvents=res.data;
    },
      error => {
        console.error('Error fetching courses:', error);
      }
    );
  }

  getTemplateMessages() {
    this.notificationService.getTemplateMessages().subscribe(res => {
      this.watiTemplates = res.data;
    });
  }
  onSubmit() {
    this.notificationService.sendWatiSMSForEvents(this.elementName, this.eventCategoryId, this.eventId).subscribe((res: any) => {
        this.elementName = '';
        this.eventCategoryId = '';
        this.eventId = 0;
        this.toastrService.success('Notification sent successfully!');
      },
        (error: any) => {
          console.error('Error sending notification:', error);
          this.toastrService.error('Failed to send notification. Please try again.');
        }
      );
  }
  getEventCategories() {
    this.eventService.getEventCategories().subscribe((res) => {
      this.eventCategories = res.data;     
    });
  }

  getEventsByCategory(e: any) {
    this.selectedEvents = this.events.filter(data => data.eventCategoryId == e.target.value);
  }

}

