import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router } from '@angular/router';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ToastrService } from 'ngx-toastr';
import { CounsellorDTO } from 'src/app/dto/CounsellorDTO';
import { CounsellorService } from 'src/app/services/counsellor.service';

@Component({
  selector: 'app-add-counsellor',
  templateUrl: './add-counsellor.component.html',
  styleUrls: ['./add-counsellor.component.scss']
})
export class AddCounsellorComponent implements OnInit {
  public Editor = ClassicEditor;

  addCounsellorForm: FormGroup = this.formBuilder.group({});


   public counsellors: CounsellorDTO[] = [];
   public counsellorId: number=1;
 
  constructor(
               private formBuilder: FormBuilder,
               private counsellorService: CounsellorService,
               private router: Router ,
               private sanitizer: DomSanitizer,
               private toaster: ToastrService
             ){}

  ngOnInit(): void {
   
    this.addCounsellorForm = this.formBuilder.group({

      counsellorName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      responsibilities: ['', Validators.required]
      
    });
    this.getAllCounsellr();
  }
  getAllCounsellr() {
    this.counsellorService.getAllCounsellors().subscribe(
      res => {
        this.counsellors = res.data;
        console.log(this.counsellors);
      },
      error => {
      
      }
    );
  }

  sanitizeAboutCourseInput(htmlString: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(htmlString);
  }


  onSubmit(): void {
    if (this.addCounsellorForm.valid) {
      const counsellorData = this.addCounsellorForm.value;
      this.counsellorService.addCounsellor(counsellorData).subscribe(res => {
        this.toaster.success('Data Added Successfully');
        this.router.navigate(['/super-admin/counsellor']);
      },
        error => {
          this.toaster.error('Data Added Successfully');
        })
    }
  }





}
