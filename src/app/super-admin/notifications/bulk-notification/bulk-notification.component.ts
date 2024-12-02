import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NotificationService } from 'src/app/services/notifications/notification.service';

@Component({
  selector: 'app-bulk-notification',
  templateUrl: './bulk-notification.component.html',
  styleUrls: ['./bulk-notification.component.scss']
})
export class BulkNotificationComponent implements OnInit {
  public watiTemplates: any;
  elementName!: string;
  role!: string;

  constructor(
    private toastrService: ToastrService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.getTemplateMessages();
  }

  getTemplateMessages() {
    this.notificationService.getTemplateMessages().subscribe((res: any) => {
      this.watiTemplates = res.data;
    })
  }

  onSubmit() {
    this.notificationService.sendWatiSMSByRole(this.elementName, this.role).subscribe(
      (res: any) => {
        this.elementName = '';
        this.role = '';
        this.toastrService.success('Notification sent successfully!');
      },
      (error: any) => {
        console.error('Error sending notification:', error);
        this.toastrService.error('Failed to send notification. Please try again.');
      }
    );
  }

}
