import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-workshop-email',
  templateUrl: './workshop-email.component.html',
  styleUrls: ['./workshop-email.component.scss']
})
export class WorkshopEmailComponent implements OnInit {

  workshopEmailForm: FormGroup = this.formBuilder.group({});


  constructor(private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void { }

  onSubmit() { }

}
