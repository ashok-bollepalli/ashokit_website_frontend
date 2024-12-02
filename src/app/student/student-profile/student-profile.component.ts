import { SocialUser } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { UserStorageService } from 'src/app/services/user-storage.service';

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.scss']
})
export class StudentProfileComponent implements OnInit{

socialUser!: SocialUser | null;
 constructor(private userStorageService: UserStorageService
) { }
  ngOnInit(): void {
    this.socialUser = this.userStorageService.getSocialUser();
    
  }

}
