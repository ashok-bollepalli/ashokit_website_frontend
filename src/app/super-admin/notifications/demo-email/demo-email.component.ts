import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-demo-email',
  templateUrl: './demo-email.component.html',
  styleUrls: ['./demo-email.component.scss']
})
export class DemoEmailComponent {
  demoEmailForm: FormGroup = this.formBuilder.group({});


  constructor(private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void { }

  onSubmit() { }
}
