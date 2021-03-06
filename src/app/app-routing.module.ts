import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProgramsComponent } from './components/programs/programs.component';
import { TeachersComponent } from './components/teachers/teachers.component';
import { StudentsComponent } from './components/students/students.component';
import { HomeComponent } from './components/home/home.component';
import { ClassesComponent } from './components/classes/classes.component';
import { CourseWorkComponent } from './components/course-work/course-work.component';
import { GradeComponent } from './components/grade/grade.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'programs', component: ProgramsComponent },
  { path: 'teachers', component: TeachersComponent },
  { path: 'students', component: StudentsComponent},
  { path: 'classes', component: ClassesComponent},
  { path: 'course-work', component: CourseWorkComponent },
  { path: 'grade', component: GradeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
