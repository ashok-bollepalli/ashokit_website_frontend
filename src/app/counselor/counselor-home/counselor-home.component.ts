import { Component, OnInit } from '@angular/core';
import { CounsellorDTO } from 'src/app/dto/CounsellorDTO';
import { CounsellorService } from 'src/app/services/counsellor.service';
import { UserStorageService } from 'src/app/services/user-storage.service';


@Component({
  selector: 'app-counselor-home',
  templateUrl: './counselor-home.component.html',
  styleUrls: ['./counselor-home.component.scss']
})
export class CounselorHomeComponent implements OnInit {

  public totalOpenEnquiries: number = 0;
  public totalClosedEnquiries: number = 0;
  public totalLostEnquiries: number = 0;
  public totalEnquiries: number = 0;
  public counsellor!: CounsellorDTO;

  constructor(
    private counsellorService: CounsellorService,
    private userStorageService: UserStorageService
  ) { }

  ngOnInit(): void {

    this.counsellor = this.userStorageService.getCounsellor();
    this.counsellorService.getTotalOpenEnquiries().subscribe(res => {
      this.totalOpenEnquiries = res;
    });
    this.counsellorService.getTotalClosedEnquiries().subscribe(res => {
      this.totalClosedEnquiries = res;
    });
    this.counsellorService.getTotalLostEnquiries().subscribe(res => {
      this.totalLostEnquiries = res;
    });
    this.counsellorService.getTotalEnquiries().subscribe(res => {
      this.totalEnquiries = res;
    });
  }

  
}
