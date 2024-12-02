import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataLoaderService } from '../services/data-loader.service';
import { EventDTO } from '../dto/EventDTO';
import { DataServiceService } from '../services/data-service.service';
import { EventCategoryDTO } from '../dto/EventCategoryDTO';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {
  public events: EventDTO[] = [];
  public eventCategories: EventCategoryDTO[] = [];
  public activeTab: string = 'All';
  totalRegisteredStudents: number = 0;

  constructor(private toastr: ToastrService,
    private router: Router,
    private dataLoaderService: DataLoaderService,
    private dataServiceService: DataServiceService,
    private meta: Meta, private titleService: Title

  ) { }

  ngOnInit(): void {
    this.setMetaTags();
    this.getAllEvents();
    this.getEventCategories();
    this.events = this.dataServiceService.eventDatas;
    this.getTotalEventRegisteredStudents();
  }

  setMetaTags() {
    // Set the title
    this.titleService.setTitle('Java Fullstack Course In Hyderabad | Best Java Fulstack Training Institute Ashok IT');

    // Set meta description
    this.meta.updateTag({ name: 'description', content: 'Discover the best software training institute in Hyderabad at Ashok IT. Offering comprehensive courses in Java, Python, AWS, DevOps, and more. Get industry-ready with hands-on training and expert guidance.' });

    // Set meta keywords
    this.meta.updateTag({ name: 'keywords', content: 'Best Software Training Institute, Hyderabad, IT Courses, Full Stack Development, Java, Python, AWS, DevOps, Ashok IT' });
  }

  selectTab(tab: string) {
    this.activeTab = tab;
  }
  onSubmit() {
    this.router.navigate(['/event-register']);
  }

  getAllEvents() {
    this.dataLoaderService.getAllEvents().subscribe((res: any) => {
      this.events = res.data;
    },
      (error) => {
        console.log("Erro fetching events:", error);
      }
    )
  }

  eventDetails(event: EventDTO) {
    this.dataServiceService.eventData = event;
    this.router.navigate(['/event/'+event.eventSlug]);
  }

  getEventCategories() {
    this.dataLoaderService.getEventCategories().subscribe((res) => {
      this.eventCategories = res.data;

    });
  }
  getEventByEventCategory(eventCategory: any) {
    if (eventCategory === 'All') {
      this.getAllEvents();
      this.selectTab('All');
    } else {
      this.dataLoaderService.getEventByEventCategory(eventCategory.eventCategoryname).subscribe((res) => {
        this.selectTab(eventCategory.eventCategoryname);
        this.events = res.data;
      });
    }
  }
  getTotalEventRegisteredStudents() {
    this.dataLoaderService.getTotalEventRegisteredStudents().subscribe(
      response => {
        this.totalRegisteredStudents = response;
      },
      error => {
        console.error('Error fetching total registered students', error);
      }
    );
  }
}
