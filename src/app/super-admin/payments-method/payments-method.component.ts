import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PaymentSettingsDTO } from 'src/app/dto/PaymentSettingsDTO';
import { DataServiceService } from 'src/app/services/data-service.service';
import { PaymentSettingsService } from 'src/app/services/payment-settings.service';

@Component({
  selector: 'app-payments-method',
  templateUrl: './payments-method.component.html',
  styleUrls: ['./payments-method.component.scss']
})
export class PaymentsMethodComponent implements OnInit {

  public paymentSetting: PaymentSettingsDTO ={
    id: 0,
    keyId: '',
    keySecret: '',
    displayCurrency: '',
    color: '',
    image: '',
    status: ''
  };
  public paymentSettings: PaymentSettingsDTO[] = [];
  public image: File | null = null;

  constructor(private router: Router,
    private paymentSettingsService: PaymentSettingsService,
    private formBuilder: FormBuilder,
    private sanitizer: DomSanitizer,
    private toastrService: ToastrService
  ) { }
  ngOnInit(): void {

    this.paymentSettingsService.getAllPaymentSettings().subscribe(res => {
      if(res && res.data && res.data.length > 0) {
      this.paymentSetting = res.data[0];
      }
    })

  }
  sanitizeHtml(htmlString: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(htmlString);
  }


  onSubmit(): void {
    if (this.image) {
      this.paymentSettingsService.addPaymentSettings(this.paymentSetting, this.image).subscribe(
        (res: any) => {
          if (res && res.data && res.data.length > 0) {
            this.paymentSetting = res.data[0];
          } else {
            console.warn('Unexpected response structure', res);
          }
        },
        (err: any) => {
          console.error('Error adding payment settings', err);
        }
      );
    } else {
      console.error('No image file provided');
    }
  }
  




  onFileChange(event: any, fileType: string): void {
    const files: FileList = event.target.files;
    if (files.length > 0) {
      if (fileType === 'image') {
        this.image = files[0];
      }
    }
  }



}


