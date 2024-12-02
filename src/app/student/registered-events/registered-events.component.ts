import { SocialUser } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { EventDTO } from 'src/app/dto/EventDTO';
import { EventRegisterDTO } from 'src/app/dto/EventRegisterDTO';
import { DataLoaderService } from 'src/app/services/data-loader.service';
import { EventService } from 'src/app/services/event.service';
import { UserStorageService } from 'src/app/services/user-storage.service';

@Component({
  selector: 'app-registered-events',
  templateUrl: './registered-events.component.html',
  styleUrls: ['./registered-events.component.scss']
})
export class RegisteredEventsComponent implements OnInit {

  public events: EventDTO[] = [];
  studentEmail!: string | null;
  socialUser!: SocialUser | null;

  constructor(
    private userStorageService: UserStorageService,
    private dataLoaderService: DataLoaderService
  ) { }

  ngOnInit(): void {
    this.socialUser = this.userStorageService.getSocialUser();
    this.studentEmail = this.socialUser ? this.socialUser.email : null;

    if (!this.studentEmail) {
      const student = this.userStorageService.getStudent();
      this.studentEmail = student ? student.studentEmail : null;
    }
    if (this.studentEmail) {
      this.dataLoaderService.getRegisteredEventsByStudentEmail(this.studentEmail).subscribe(
        (res: any) => {
          this.events = res.data;
        },
        error => {
          console.error("Error fetching registered events: ", error);
        }
      );
    } else {
      console.error("studentEmail is null or undefined");
    }
  }

}
