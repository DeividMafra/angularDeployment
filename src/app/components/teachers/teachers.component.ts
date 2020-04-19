import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { GeneralService } from 'src/app/general.service';

declare const $: any;
@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css']
})
export class TeachersComponent implements OnInit {

  constructor(private service: GeneralService) { }
  public teachersList;
  private collection: string = "teachers";
  public courseList: string[] = ["CSD_1030_1", "CSD_1165_1", "CSD_2224_1", "CSD_2206_1", "CSD_1113_1", "CSD_1134_1", "CSD_2103_1", "EAP_3106_1"]

  //teacher form fields
  public teacherForm = new FormGroup({
    _id: new FormControl(null),//only for control purposes
    teacherId: new FormControl(''),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    courses: new FormControl('')
  });

  ngOnInit() {
    this.getTeachers();
  }

  /**
  * @remarks List function;
  * @date 04/03/2020;
  * @author Deivid Mafra;
  */
  getTeachers() {
    return this.service.getService(this.collection)
      .subscribe(result => this.teachersList = result);
  }

  /**
   * @remarks Function responsible for submitting the form. Once the date is filled, it will check the '_id'. If there is no
   * _id, it's a new insert, else it is an update;
   * @date 04/03/2020;
   * @param selectedTeacher - The teacher selected;
   * @author Deivid Mafra.
   */
  onSubmitTeacher(selectedTeacher) {
    if (selectedTeacher.valid) {


      if (typeof selectedTeacher.value._id === undefined || selectedTeacher.value._id === null) {
        this.service.postService(this.collection, selectedTeacher.value)
          .subscribe(() => {
            this.getTeachers();
            $("mat-form-field").removeClass('mat-form-field-invalid');
          });
        // .subscribe(newTeacher => this.teachersList.push(newTeacher));

      } else {
        var teacher = {
          "_id": selectedTeacher.value._id,
          "teacherId": selectedTeacher.value.teacherId,
          "firstName": selectedTeacher.value.firstName,
          "lastName": selectedTeacher.value.lastName,
          "email": selectedTeacher.value.email,
          "courses": selectedTeacher.value.courses
        }
        let index = this.teachersList.indexOf(this.teachersList.find(({ _id }) => _id === selectedTeacher.value._id))

        this.service.putService(this.collection, selectedTeacher.value._id, teacher)
          .subscribe(() => {
            this.teachersList[index] = teacher;
            $("mat-form-field").removeClass('mat-form-field-invalid');

          },
            (err) => console.log(err));
      }

      this.teacherForm.reset();
    }
  }

  /**
   * @remarks Function responsible for getting the data from the list and populate the form allowing the end user edit it;
   * @date 04/03/2020;
   * @param teacher - The teacher selected;
   * @author Deivid Mafra.
   */
  selectTeacher(teacher) {
    this.teacherForm.get('_id').setValue(teacher._id);
    this.teacherForm.get('teacherId').setValue(teacher.teacherId);
    this.teacherForm.get('firstName').setValue(teacher.firstName);
    this.teacherForm.get('lastName').setValue(teacher.lastName);
    this.teacherForm.get('email').setValue(teacher.email);
    this.teacherForm.get('courses').setValue(teacher.courses);
  }

  /**
   * @remarks Function responsible for deleting the teacher from the list;
   * @date 04/03/2020;
   * @param teacher - The teacher selected to be deleting;
   * @author Deivid Mafra.
   */
  deleteTeacher(teacher: any) {
    let index = this.teachersList.indexOf(this.teachersList.find(({ _id }) => _id === teacher._id))

    this.service.deleteService(this.collection, teacher._id)
      .subscribe(
        (res: any) => alert(teacher.teacherId + " " + res.message),
        error => console.log(error)
      );
    this.teachersList.splice(index, 1);
  }

  clearForm() {
    this.teacherForm.reset();
    setTimeout(() => {
      $("mat-form-field").removeClass('mat-form-field-invalid');
    }, 500);
  }
}