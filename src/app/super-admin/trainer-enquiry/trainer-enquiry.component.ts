import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { TrainerEnquiryDTO } from 'src/app/dto/TrainerEnquiryDTO';
import { DataServiceService } from 'src/app/services/data-service.service';
import { EnquiriesService } from 'src/app/services/enquiries.service';

@Component({
  selector: 'app-trainer-enquiry',
  templateUrl: './trainer-enquiry.component.html',
  styleUrls: ['./trainer-enquiry.component.scss']
})
export class TrainerEnquiryComponent implements OnInit {
  public trainerEnquiries: TrainerEnquiryDTO[] = [];
  public filteredTrainerEnquiries: TrainerEnquiryDTO[] = [];
  public name: string = '';
  public createdDate: string = '';
  public modifiedDate: string = '';

  public pageSize: number = 5;
  public currentPage: number = 1;
  public totalItems: number = 0;
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();

  constructor(
    private router: Router,
    private enquiriesService: EnquiriesService,
    private dataService: DataServiceService
  ) { }

  ngOnInit() {
    this.getAllTrainerEnquiries();

  }

  getAllTrainerEnquiries() {
    this.enquiriesService.getAllTrainerEnquiries().subscribe(
      res => {
        this.trainerEnquiries = res.data;
        this.filter();
      },
      error => {
      }
    );
  }

  filter() {
    this.filteredTrainerEnquiries = this.trainerEnquiries.filter(
      (trainerEnquirie: TrainerEnquiryDTO) => {
        return trainerEnquirie.name
          .toLowerCase()
          .trim()
          .includes(this.name.toLowerCase().trim());
      }

    );
    this.calculateTotalPages();
  }



  calculateTotalPages() {
    if (this.filteredTrainerEnquiries) {
      this.totalItems = this.filteredTrainerEnquiries.length;
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
