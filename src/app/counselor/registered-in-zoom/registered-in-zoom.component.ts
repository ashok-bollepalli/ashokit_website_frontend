import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CourseDTO } from 'src/app/dto/CourseDTO';
import { ScheduleBatchDTO } from 'src/app/dto/ScheduleBatchDTO';
import { TrainerDTO } from 'src/app/dto/TrainerDTO';
import { ZoomRegisteredDTO } from 'src/app/dto/ZoomRegisteredDTO';
import { BatchesScheduleService } from 'src/app/services/batches-schedule.service';
import { StudentBulkUploadService } from 'src/app/services/student-bulk-upload.service';
import { TrainerService } from 'src/app/services/trainer.service';
import { UsersResponseService } from 'src/app/services/users-response.service';


@Component({
  selector: 'app-registered-in-zoom',
  templateUrl: './registered-in-zoom.component.html',
  styleUrls: ['./registered-in-zoom.component.scss']
})
export class RegisteredInZoomComponent implements OnInit {
  public courses: CourseDTO[] = [];
  trainers: TrainerDTO[] = [];
  public selectedBatches: ScheduleBatchDTO[] = [];
  public trainerId: any;
  public id: any;
  public courseName: string = "";
  public status: string = '';
  public leadStatus: string = '';
  zoomRegisters: ZoomRegisteredDTO[] = [];
  filteredZoom: ZoomRegisteredDTO[] = [];

  public pageSize: number = 10;
  public currentPage: number = 1;
  public totalItems: number = 0;
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();

  public batches: ScheduleBatchDTO[] = [];
  public zoomRegDto: ZoomRegisteredDTO = {
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
    enrollmentStatus:''
  }



  constructor(
    private usersResponseService: UsersResponseService,
    private trainerService: TrainerService,
    private batchesScheduleService: BatchesScheduleService,
    private studentBulkUploadService: StudentBulkUploadService
  ) { }

  @ViewChild('myModal') myModal!: ElementRef;

  ngOnInit(): void {
    this.getAllZoomRegisters();
    this.getAllTrainers();
    this.getAllScheduledBatches();
    
  }

  getPaginatedItems(): ZoomRegisteredDTO[] {
    return this.filteredZoom.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize);
  }

  getAllZoomRegisters() {
    this.usersResponseService.getAllZoomRegisters().subscribe(
      res => {
        this.zoomRegisters = res.data;
        this.filteredZoom = Array.isArray(res.data) ? res.data : []; // Ensure it's an array
      },
      error => {

      }
    );
  }

  getTrainerName(trainerId: number): string {
    const foundTrainer = this.trainers.find(trainer => trainer.trainerId == trainerId);
    return foundTrainer ? foundTrainer.trainerName : 'Unknown';
  }

  getAllTrainers() {
    this.trainerService.getAllTrainers().subscribe(
      res => {
        this.trainers = res.data;
      },
      error => {
        console.error('Error fetching courses:', error);
      }
    );
  }


  getBranchName(id: number): string {
    const founBatch = this.batches.find(batch => batch.id == this.id);
    return founBatch ? founBatch.scheduleName : 'Unknown';
  }

  getAllScheduledBatches() {
    this.batchesScheduleService.getAllScheduledBatches().subscribe(res => {
      this.batches = res.data;
      this.selectedBatches = res.data;
    },
      error => {
        console.error('Error fetching courses:', error);
      }
    );
  }

  findBatchByTrainerAndCourseStatus(obj: any) {
    return this.selectedBatches = this.batches.filter(data => data.courseStatus == obj.target.value && data.trainerId == this.zoomRegDto.trainerId);
  }

  applyFilter() {
    this.usersResponseService.getAllZoomRegistersWithFilter(this.zoomRegDto)
      .subscribe(res => {
        this.zoomRegisters = res.data;
        this.filteredZoom = Array.isArray(res.data) ? res.data : []; // Ensure it's an array
      });
    this.calculateTotalPages();
  }


  calculateTotalPages() {
    if (this.filteredZoom) {
      this.totalItems = this.filteredZoom.length;
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

  updateZoomRegisteredStatus(id: number, status: string) {
    if (status === 'Active') {
      status = 'In_Active'
    } else {
      status = 'Active';
    }

    this.usersResponseService.updateZoomRegisteredStatus(id, status).subscribe((res) => {
      this.getAllZoomRegisters();
      this.applyFilter();
    })
  }

  closeModal(): void {
    const modalElement = this.myModal.nativeElement;
    modalElement.style.display = 'none';
    modalElement.classList.remove('show');
  }
  openModal(zoomRegister: any): void {
    this.zoomRegDto = {
      ...zoomRegister
    };
    const modalElement = document.querySelector('.modal') as HTMLElement;
    modalElement.style.display = 'block';
    modalElement.classList.add('show');
  }

  updateStatus() {
    this.studentBulkUploadService.updateZoomRegisteredStatus(this.zoomRegDto.id, this.zoomRegDto.status).subscribe((res) => {
      this.closeModal();
      this.getAllZoomRegisters();
    });
  }
}



