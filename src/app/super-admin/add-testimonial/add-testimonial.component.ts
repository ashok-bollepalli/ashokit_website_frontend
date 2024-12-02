import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TestimonialDTO } from 'src/app/dto/TestimonialDTO';
import { TestimonialService } from 'src/app/services/testimonial.service';
import { UserStorageService } from 'src/app/services/user-storage.service';

@Component({
  selector: 'app-add-testimonial',
  templateUrl: './add-testimonial.component.html',
  styleUrls: ['./add-testimonial.component.scss']
})
export class AddTestimonialComponent implements OnInit {

  TestimonialForm: FormGroup = this.formBuilder.group({});
  public testimonials: TestimonialDTO[] = [];
  image: File | null = null;
  constructor(
    private testimonialService: TestimonialService,
    private router: Router,
    private formBuilder: FormBuilder,
    private toaster: ToastrService,
    private userStorageService: UserStorageService

  ) { }

  ngOnInit(): void {
    this.TestimonialForm = this.formBuilder.group({
      name: ['', Validators.required],
      designation: ['', Validators.required],
      description: ['', Validators.required],
      image: ['', Validators.required],
    });

  }

  onSubmit(): void {
    if (this.TestimonialForm.valid && this.image) {
      const formData = this.TestimonialForm.value;
      if (this.image) {
        this.testimonialService.addTestimonial(formData, this.image).subscribe(
          (res: any) => {
            this.toaster.success('Data Added Successfully');
            if (this.userStorageService.getRole() == 'SUPERADMIN') {
              this.router.navigate(['/super-admin/testimonial']);
            } else {
              this.router.navigate(['/admin/testimonial']);
            }
          });
      }
    }
  }

    onFileChange(event: any, fileType: string): void {
      const files: FileList = event.target.files;
      if(files.length > 0) {
      if (fileType === 'image') {
        this.image = files[0];
      }
    }
  }
}
