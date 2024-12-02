import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { TrainerDTO } from 'src/app/dto/TrainerDTO';
import { DataServiceService } from 'src/app/services/data-service.service';
import { TrainerService } from 'src/app/services/trainer.service';

@Component({
  selector: 'app-trainer',
  templateUrl: './trainer.component.html',
  styleUrls: ['./trainer.component.scss']
})
export class TrainerComponent implements OnInit {
  public filteredTrainers: TrainerDTO[] = [];
  public trainers: TrainerDTO[] = [];
  public trainerId: number = 0;
  public trainerName: string = '';
  
  public pageSize: number = 5; 
  public currentPage: number = 1; 
  public totalItems: number = 0;
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();


  ngOnInit(): void {
    this.getAllTrainersWithStatus();
  }

  constructor(private router: Router,
    private trainerService: TrainerService,
    private dataService: DataServiceService) { }

  filter() {

    this.filteredTrainers = this.trainers.filter(
      (trainer: TrainerDTO) => {
        return trainer.trainerName
          .toLowerCase()
          .includes(this.trainerName.trim().toLowerCase());
      }

    );

    this.calculateTotalPages();
  }


  // getAllTrainers() {
  //   this.trainerService.getAllTrainers().subscribe(
  //     res => {
  //       this.trainers = res.data
  //       this.filter();
  //     },
  //     error => {
  //       console.error('Error fetching courses:', error);
  //     }
  //   );
  // }
  getAllTrainersWithStatus() {
    this.trainerService.getAllTrainersWithStatus().subscribe(
      res => {
        this.trainers = res.data
        this.filter();
      },
      error => {
        console.error('Error fetching courses:', error);
      }
    );
  }

  addTrainer() {
    this.router.navigate(['/super-admin/addTrainer']);
  }

  modifyTrainerStatus(trainerId: number, activeStatus: string) {
    if (activeStatus === 'Active') {
      activeStatus = 'In_Active';
    } else {
      activeStatus = 'Active';
    }
    this.trainerService.modifyTrainerStatus(trainerId, activeStatus).subscribe((res) => {
      this.getAllTrainersWithStatus();
      this.filter();
    });
  }

  editTrainer(trainer: TrainerDTO) {
    this.dataService.trainersData = trainer;
    this.router.navigate(['/super-admin/update-trainers']);
  }
  onSubmit() {

  }
  calculateTotalPages() {
    if (this.filteredTrainers) {
      this.totalItems = this.filteredTrainers.length;
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

  updateTrainerActiveStatus(trainerId: number, activeStatus:string){
    if (activeStatus === 'Active') {
      activeStatus = 'In_Active';
    } else {
      activeStatus = 'Active';
    }
    this.trainerService.updateTrainerActiveStatus(trainerId, activeStatus).subscribe((res) => {
      this.getAllTrainersWithStatus();
      this.filter();
    });
  }
  deleteTrainer(trainerId: number) {
    this.trainerService.deleteTrainer(trainerId).subscribe((res) => {
      this.getAllTrainersWithStatus();
      this.filter();
    })
  }

}
