import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { EventCategoryDTO } from 'src/app/dto/EventCategoryDTO';
import { EventDTO } from 'src/app/dto/EventDTO';
import { TrainerDTO } from 'src/app/dto/TrainerDTO';
import { DataServiceService } from 'src/app/services/data-service.service';
import { EventService } from 'src/app/services/event.service';
import { TrainerService } from 'src/app/services/trainer.service';
import { UserStorageService } from 'src/app/services/user-storage.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {

  events: EventDTO[] = [];
  eventName: string = '';
  filteredEvents: EventDTO[] = [];
  public trainers: TrainerDTO[] = [];
  eventCategories: EventCategoryDTO[] = [];

  public pageSize: number = 5;
  public currentPage: number = 1;
  public totalItems: number = 0;
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();


  constructor(private router: Router,
    private eventService: EventService,
    private userStorageService: UserStorageService,
    private dataService: DataServiceService
  ) { }

  ngOnInit(): void {
    this.getAllEvents();
    this.getEventCategories();
  }

  filter() {
    this.filteredEvents = this.events.filter(
      (eventDTO: EventDTO) => {
        return eventDTO.eventName
          .toLowerCase()
          .trim()
          .includes(this.eventName.toLowerCase().trim());
      }
    );
    this.calculateTotalPages();
  }
  addEvent() {
    
    if (this.userStorageService.getRole() == 'SUPERADMIN') {
      this.router.navigate(['/super-admin/add-event']);
    } else {
      this.router.navigate(['/admin/add-event']);
    }
  }

  getAllEvents(): void {
    this.eventService.getAllEvents().subscribe(
      res => {
        this.events = res.data;
        this.filteredEvents = res.data;
        this.filter();

      },
      error => {
        console.error('Error fetching courses:', error);
      }
    );
  }

  getEventCategories() {
    this.eventService.getEventCategories().subscribe(
      res => {
        this.eventCategories = res.data;
      },
      error => {
        console.error('Error fetching eventCategories:', error);
      }
    );
  }

  updateEvents(event: EventDTO) {
    this.dataService.eventData = event; // Set DTO in DataService
    if (this.userStorageService.getRole() == 'SUPERADMIN') {
      this.router.navigate(['/super-admin/update-event']);
    } else {
      this.router.navigate(['/admin/update-event']);
    }
  }

  updateEventStatus(eventId: number, eventStatus: number) {
    if (eventStatus === 1) {
      eventStatus = 0;
    } else {
      eventStatus = 1;
    }
    this.eventService.updateEventStatus(eventId, eventStatus).subscribe((res) => {
      this.getAllEvents();
      this.filter();
    });
  }

  deleteEvent(eventId: number) {
    this.eventService.deleteEvent(eventId).subscribe((res) => {
      this.getAllEvents();
      this.filter();
    });

  }

  calculateTotalPages() {
    if (this.filteredEvents) {
      this.totalItems = this.filteredEvents.length;
    } else {
      this.totalItems = 0;
    }
  }
  getTotalPages(): number {
    this.calculateTotalPages();
    return Math.ceil(this.totalItems / this.pageSize);
  }

  getPageArray(): number[] {
    const totalPages = this.getTotalPages();
    const maxVisiblePages = 5;
    const pages: number[] = [];

    let startPage = Math.max(1, this.currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  }

  onPageChange(page: number): void {
    if (page >= 1 && page <= this.getTotalPages()) {
      this.currentPage = page;
      this.pageChange.emit(this.currentPage);
    }
  }
  updateActiveSw(eventId: number, activeSw: number) {
    if (activeSw === 1) {
      activeSw = 0;
    } else {
      activeSw = 1;
    }
    this.eventService.updateActiveSw(eventId, activeSw).subscribe((res) => {
      this.getAllEvents();
      this.filter();
    });
  }
  getEventCategoryName(eventCategoryId: number) {
    const foundEventCategory = this.eventCategories.find(eventCategory => eventCategory.eventCategoryId === eventCategoryId);
    return foundEventCategory ? foundEventCategory.eventCategoryname : 'Unknown';
  }

}
