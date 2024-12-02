import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-demo-sms',
  templateUrl: './demo-sms.component.html',
  styleUrls: ['./demo-sms.component.scss']
})
export class DemoSmsComponent {
  demoSmsForm: FormGroup = this.formBuilder.group({});


  constructor(private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void { }

  onSubmit() { }
}
