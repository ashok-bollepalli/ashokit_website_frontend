import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { EventCategoryDTO } from 'src/app/dto/EventCategoryDTO';
import { EventDTO } from 'src/app/dto/EventDTO';
import { EventRegisterDTO } from 'src/app/dto/EventRegisterDTO';
import { DataLoaderService } from 'src/app/services/data-loader.service';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-events-registrations-data',
  templateUrl: './events-registrations-data.component.html',
  styleUrls: ['./events-registrations-data.component.scss']
})
export class EventsRegistrationsDataComponent implements OnInit{

  public eventRegistrations: EventRegisterDTO[] = [];
  public eventCategories: EventCategoryDTO[] = [];
  public events: EventDTO[] = [];
 
  public pageSize: number = 15;
  public currentPage: number = 1;
  public totalItems: number = 0;
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();


  constructor(
    private router: Router,
    private eventRegService: EventService,
    private dataLoaderService: DataLoaderService,

  ) { }

  ngOnInit(): void {
   this.getEventsRegistrations();
   this.getEventCategories();
  }


  

  getEventCategories(){
    this.eventRegService.getEventCategories().subscribe(
      res => {
        this.eventCategories = res.data;
      }
    )
  }

  onCategoryChange(event: Event): void {
    // Set the selected category name from the dropdown
    const selectedCategoryName = (event.target as HTMLSelectElement).value;
  
    if (selectedCategoryName) {
 
      // Use the value directly or assign it to a component variable
      this.dataLoaderService.getEventByEventCategory(selectedCategoryName).subscribe(
        (res) => {
          this.events = res.data; // Assuming res.data contains the events list
        },
        (error) => {
          console.error('Error fetching events:', error);
        }
      );
    } else {
      console.log('No category selected');
      this.events = []; // Clear events if no category is selected
    }
  }

  onEventChange(event: Event): void {
    const selectedEventId = (event.target as HTMLSelectElement).value;

    if (selectedEventId) {
      this.dataLoaderService.getRegisteredStudentsForEvent(selectedEventId).subscribe(
        (res) => {
          this.eventRegistrations = res.data; // Assuming res.data contains event details
        },
        (error) => {
          console.error('Error fetching event details:', error);
        }
      );
    } else {
      console.log('No event selected');
    }
  }
  

  getEventByEventCategory(eventCategory: any) {
      this.dataLoaderService.getEventByEventCategory(eventCategory.eventCategoryname).subscribe((res) => {
        this.events = res.data;
      });
  }

  getEventsRegistrations() {
    this.eventRegService.getEventRegistrations().subscribe(
      res => {
        this.eventRegistrations = res.data;
      },
      error => {
        console.error('Error fetching courses:', error);
      }
    );
  }

  calculateTotalPages() {
    if (this.eventRegistrations) {
      this.totalItems = this.eventRegistrations.length;
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

}
