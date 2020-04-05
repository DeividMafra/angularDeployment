import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/general.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-programs',
  templateUrl: './programs.component.html',
  styleUrls: ['./programs.component.css']
})
export class ProgramsComponent implements OnInit {

  constructor(private service: GeneralService) { }
  public programsList;
  private collection: string = "programs";

  //Program form fields
  public programForm = new FormGroup({
    _id: new FormControl(null),//only for control purposes
    programId: new FormControl(''),
    programName: new FormControl(''),
    room: new FormControl('')
  });

  ngOnInit() {
    this.getPrograms();
  }

  /**
  * @remarks List function;
  * @date 04/01/2020;
  * @author Deivid Mafra;
  */
  getPrograms() {
    return this.service.getService(this.collection)
      .subscribe(result => this.programsList = result);
  }

  /**
   * @remarks Function responsible for submitting the form. Once the date is filled, it will check the '_id'. If there is no
   * _id, it's a new insert, else it is an update;
   * @date 04/01/2020;
   * @param selectedProgram - The program selected;
   * @author Deivid Mafra.
   */
  onSubmitProgram(selectedProgram) {
    if (typeof selectedProgram.value._id === undefined || selectedProgram.value._id === null) {
      this.service.postService(this.collection, selectedProgram.value)
        .subscribe(newProgram => this.programsList.push(newProgram));

    } else {
      var program = {
        "_id": selectedProgram.value._id,
        "programId": selectedProgram.value.programId,
        "programName": selectedProgram.value.programName,
        "room": selectedProgram.value.room
      }
      let index = this.programsList.indexOf(this.programsList.find(({ _id }) => _id === selectedProgram.value._id))

      this.service.putService(this.collection, selectedProgram.value._id, program)
        .subscribe(() => this.programsList[index] = program)
    }

    this.programForm.reset();
  }

  /**
   * @remarks Function responsible for getting the data from the list and populate the form allowing the end user edit it;
   * @date 04/01/2020;
   * @param program - The program selected;
   * @author Deivid Mafra.
   */
  selectProgram(program) {
    this.programForm.get('_id').setValue(program._id);
    this.programForm.get('programId').setValue(program.programId);
    this.programForm.get('programName').setValue(program.programName);
    this.programForm.get('room').setValue(program.room);
  }

  /**
   * @remarks Function responsible for deleting the program from the list;
   * @date 04/01/2020;
   * @param program - The program selected to be deleting;
   * @author Deivid Mafra.
   */
  deleteProgram(program: any) {
    let index = this.programsList.indexOf(this.programsList.find(({ _id }) => _id === program._id))

    this.service.deleteService(this.collection, program._id)
      .subscribe(
        (res: any) => alert(program.programId + " " + res.message),
        error => console.log(error)
      );
    this.programsList.splice(index, 1);
  }
}