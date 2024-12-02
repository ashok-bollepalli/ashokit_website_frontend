import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrainerHomeComponent } from './trainer-home/trainer-home.component';
import { TrainerRoutingModule } from '../trainer-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TrainerHeaderComponent } from './trainer-header/trainer-header.component';
import { UploadNotesComponent } from './upload-notes/upload-notes.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ClassNotesComponent } from './class-notes/class-notes.component';
import { UpdateUploadnotesComponent } from './update-uploadnotes/update-uploadnotes.component';




@NgModule({
  declarations: [
    TrainerHomeComponent,
    TrainerHeaderComponent,
    UploadNotesComponent,
    DashboardComponent,
    ClassNotesComponent,
    UpdateUploadnotesComponent
  ],
  imports: [
    CommonModule,
    TrainerRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class TrainerModule { }
