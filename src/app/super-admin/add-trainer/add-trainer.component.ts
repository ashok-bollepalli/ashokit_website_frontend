import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CountryCodeDTO } from 'src/app/dto/CountryCodeDTO';
import { TrainerService } from 'src/app/services/trainer.service';
@Component({
  selector: 'app-add-faculty',
  templateUrl: './add-trainer.component.html',
  styleUrls: ['./add-trainer.component.scss']
})
export class AddTrainerComponent implements OnInit {

  trainerForm: FormGroup = this.formBuilder.group({});
  resumeFile: File | null = null;
  public countryCodes: CountryCodeDTO[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private trainerService: TrainerService,
    private router: Router,
    private toaster: ToastrService
  ) { }
  ngOnInit(): void {
    this.trainerForm = this.formBuilder.group({
      trainerName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      countryCode: ['', Validators.required],
      mobileNumber: ['', Validators.required],
      experience: ['', Validators.required],
      address: ['',],
      resume: ['', Validators.required],

    });
    this.getAllCountryCodes();
  }

  onSubmit(): void {
    if (this.trainerForm.valid && this.resumeFile) {
      const trainerData = this.trainerForm.value;
      if (this.resumeFile)
        this.trainerService.addTrainer(trainerData, this.resumeFile).subscribe(res => {
          this.toaster.success('Data Added Successfully');
          this.router.navigate(['/super-admin/trainer']);
        })
    }

  }
  onResumeFileChange(event: any) {
    const files: FileList = event.target.files;
    if (files && files.length > 0) {
      this.resumeFile = files[0];
    }
  }

  getAllCountryCodes() {
    this.trainerService.getAllCountryCodes().subscribe(res => {
      this.countryCodes = res.data;
    })
  }

}

