import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ScheduleBatchDTO } from 'src/app/dto/ScheduleBatchDTO';
import { TrainerDTO } from 'src/app/dto/TrainerDTO';
import { ZoomRegisteredDTO } from 'src/app/dto/ZoomRegisteredDTO';
import { BatchesScheduleService } from 'src/app/services/batches-schedule.service';
import { TrainerService } from 'src/app/services/trainer.service';
import { UsersResponseService } from 'src/app/services/users-response.service';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-zoom-registered',
  templateUrl: './zoom-registered.component.html',
  styleUrls: ['./zoom-registered.component.scss']
})
export class ZoomRegisteredComponent implements OnInit {
  public filteredZoom: ZoomRegisteredDTO[] = [];
  public zoomRegisters: ZoomRegisteredDTO[] = [];
  public trainers: TrainerDTO[] = [];
  public trainerId: any;
  public batchId: any;
  public batches:ScheduleBatchDTO[]=[];
  public scheduleName: any;
  public pageSize: number = 5;
  public currentPage: number = 1;
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();
  public totalItems: number = 0;
  public selectedFilteredZoom: ZoomRegisteredDTO = {
    id: 0,
    name: '',
    email: '',
    countryCode: '',
    phone: 0,
    message: '',
    trainerId: 0,
    courseName: '',
    status: '',
    batchId: 0,
    createdDate: 0,
    comment: '',
    enrollmentStatus: ''
  };
  public comment!:string;

  constructor(private router: Router,
    private usersResponseService: UsersResponseService,
    private batchesScheduleService:BatchesScheduleService,
    private trainerService: TrainerService

  ) { }
  @ViewChild('myModal') myModal!: ElementRef;
  
  ngOnInit(): void {
    this.getAllZoomRegisters();
    this.getAllTrainers();
    this.getAllScheduledBatches();
  }

  getAllTrainers() {
    this.trainerService.getAllTrainers().subscribe(
      res => {
        this.trainers = res.data;
        // this.applyFilters();
      },
      (error: any) => { 
        console.error('Error fetching trainers:', error);
      }
    );
  } 

  getAllZoomRegisters() {
    this.usersResponseService.getAllZoomRegisters().subscribe(
      res => {
        this.zoomRegisters = res.data;
        this.filteredZoom = res.data;
      },
      error => {
        console.log('error1', error)
      }
    );
  } 
       
  getAllScheduledBatches() {
    this.batchesScheduleService.getAllScheduledBatches().subscribe(
      res => {
        this.batches = res.data;
      }, 
      error => {
      console.log('error1',error)
      }
    )
  }
  
  applyFilters() {
    this.filteredZoom = this.zoomRegisters.filter((zoomReg: ZoomRegisteredDTO) => {
      const matchedTrainerName = zoomReg.trainerId == this.trainerId;
      const matchedBatchName = zoomReg.batchId == this.batchId;
       return matchedTrainerName &&  matchedBatchName;    
      
      }
    );
    this.calculateTotalPages();
  }


  calculateTotalPages() {
    this.totalItems = this.filteredZoom ? this.filteredZoom.length : 0;
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
  generateExcel() {
    const excelContent = this.constructExcelContent();
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(excelContent);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'ZoomRegisters');
    XLSX.writeFile(wb, 'zoomRegisters.xlsx');
  }
  
  private constructExcelContent(): any[] {
    return this.zoomRegisters.map(ZoomRegisters => ({
      'Id': ZoomRegisters.id,
      'Name': ZoomRegisters.name,
      'Email':ZoomRegisters.email,
      'Phone Number':ZoomRegisters.phone,
      'CourseName':ZoomRegisters.courseName,
      'TrainerName':ZoomRegisters.trainerId,
      'Message':ZoomRegisters.message,
      'Created At': ZoomRegisters.createdDate,
      'Status': ZoomRegisters.status,
      'comment':ZoomRegisters.comment
      
    }));
  }
  getTrainerName(trainerId: number): string {
    const foundTrainer = this.trainers.find(trainer => trainer.trainerId == trainerId);
    return foundTrainer ? foundTrainer.trainerName : 'Unknown';
  }

  getScheduleName(batchId: number): string {
    const foundScheduleName = this.batches.find(batch => batch.id == batchId);
    return foundScheduleName ? foundScheduleName.batchCode : 'Unknown';
  }
  closeModal(): void {
    const modalElement = this.myModal.nativeElement;
    modalElement.style.display = 'none';
    modalElement.classList.remove('show');
  }
  openModal(enquiry:any): void {
    this.selectedFilteredZoom = {
      ...enquiry,
       comment: '', 
    };
    const modalElement = document.querySelector('.modal') as HTMLElement;
    modalElement.style.display = 'block';
    modalElement.classList.add('show');
  }

  updateLeadStatus(){
    this.usersResponseService.updateZoomRegisterStatusAndComment( this.selectedFilteredZoom.id,
        this.selectedFilteredZoom.status,
      this.selectedFilteredZoom.comment).subscribe((res) => {
      this.closeModal();
      this.getAllZoomRegisters();
    });
  }
}




