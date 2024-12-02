import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MockInterviewFeeService } from 'src/app/services/mock-interview-fee.service';


@Component({
  selector: 'app-add-empolyment',
  templateUrl: './add-empolyment.component.html',
  styleUrls: ['./add-empolyment.component.scss']
})
export class AddEmpolymentComponent implements OnInit {
  addEmpolymentForm: FormGroup = this.formBuilder.group({});

  constructor(private formBuilder: FormBuilder,
    private sanitizer: DomSanitizer,
    private router: Router,
    private toaster: ToastrService,
    private mockInterviewFeeService: MockInterviewFeeService) { }

  ngOnInit(): void {

    this.addEmpolymentForm = this.formBuilder.group({
      roles: ['', Validators.required],
      fee: ['', Validators.required],

    });
  }
  sanitizeAboutCourseInput(htmlString: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(htmlString);
  }
  onSubmit(): void {
    if (this.addEmpolymentForm.valid) {
      const mockInterviewFeeData = this.addEmpolymentForm.value;
      this.mockInterviewFeeService.addMockInterviewFee(mockInterviewFeeData).subscribe(res => {
        this.toaster.success('Data Added Successfully');
        this.router.navigate(['super-admin/list-mock-interviews-fee'])
      })
    }
  }
}
