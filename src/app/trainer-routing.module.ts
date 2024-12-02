import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrainerHomeComponent } from './trainer/trainer-home/trainer-home.component';
import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { UploadNotesComponent } from './trainer/upload-notes/upload-notes.component';
import { DashboardComponent } from './trainer/dashboard/dashboard.component';
import { ClassNotesComponent } from './trainer/class-notes/class-notes.component';
import { UpdateUploadnotesComponent } from './trainer/update-uploadnotes/update-uploadnotes.component';
//import { ViewNotesComponent } from './trainer/view-notes/view-notes.component';

const routes: Routes = [
  { path: '', component: TrainerHomeComponent },
  { path: 'home', component: TrainerHomeComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'class-notes', component: ClassNotesComponent },
  { path:'access-denied', component:AccessDeniedComponent},
  { path:'upload-notes', component:UploadNotesComponent},
  { path:'update-uploadnotes', component:UpdateUploadnotesComponent},
 // { path:'view-notes', component:ViewNotesComponent},
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: 'dashboard', pathMatch: 'full' } 

];

@NgModule({
  imports: [RouterModule.forChild(routes)], // Change forRoot to forChild
  exports: [RouterModule]
})
export class TrainerRoutingModule { }
