import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TrainerDTO } from 'src/app/dto/TrainerDTO';
import { DataServiceService } from 'src/app/services/data-service.service';
import { TrainerService } from 'src/app/services/trainer.service';

@Component({
  selector: 'app-update-trainers',
  templateUrl: './update-trainers.component.html',
  styleUrls: ['./update-trainers.component.scss']
})
export class UpdateTrainersComponent {
  Trainer!: TrainerDTO;

  trainerName: string ='';

  constructor(
    private trainerService: TrainerService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dataService: DataServiceService,
    private toaster: ToastrService
    
  ) {}
  ngOnInit(): void {

  this.Trainer = this.dataService.trainersData;

  }

  onSubmit(): void {
    if (this.Trainer) { 
      this.trainerService.updateTrainer(this.Trainer).subscribe(
        (res: any) => {
          this.toaster.success('Data Updated Successfully');
          this.router.navigate(['/super-admin/trainer']);
        },
        (error) => {
          console.error("Error updating trainer:", error);
         
        }
      );
    } else {
      
    }
  }
  
}
