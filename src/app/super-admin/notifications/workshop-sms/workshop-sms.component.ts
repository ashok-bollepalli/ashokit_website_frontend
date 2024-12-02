import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-workshop-sms',
  templateUrl: './workshop-sms.component.html',
  styleUrls: ['./workshop-sms.component.scss']
})
export class WorkshopSmsComponent {
  workshopSmsForm: FormGroup = this.formBuilder.group({});


  constructor(private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void { }

  onSubmit() { }
}
