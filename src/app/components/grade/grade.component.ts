import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { GeneralService } from 'src/app/general.service';

declare const $: any;
@Component({
	selector: 'app-grade',
	templateUrl: './grade.component.html',
	styleUrls: ['./grade.component.css']
})
export class GradeComponent implements OnInit {

	constructor(private service: GeneralService) { }
	public gradeList;
	private collection: string = "grade";


	public gradeForm = new FormGroup({
		_id: new FormControl(null),//only for control purposes
		//Id: new FormControl(''),
		gradeLetter: new FormControl(''),
		grade: new FormControl(''),
		studentId: new FormControl(''),
		course: new FormControl('')
	});


	ngOnInit() {
		this.getAllGrades();
	}

	getAllGrades() {
		return this.service.getService(this.collection).
			subscribe(x => this.gradeList = x)
	}


	onSubmitGrade(selectedGrade) {

		console.log(">>>>", selectedGrade.value);
		if (selectedGrade.valid) {
			if (typeof selectedGrade.value._id === undefined || selectedGrade.value._id == null) {
				console.log("id is null");
				console.log(selectedGrade.value);

				var addGrade = {
					//"_id": selectedGrade.value._id,
					"gradeLetter": selectedGrade.value.gradeLetter,
					"grade": selectedGrade.value.grade,
					"studentId": selectedGrade.value.studentId,
					"course": selectedGrade.value.course
				}

				this.service.postService(this.collection, addGrade)
					.subscribe(() => {
						this.getAllGrades();
						selectedGrade.reset();
						$("mat-form-field").removeClass('mat-form-field-invalid');
					},
						(err) => console.log(err));

				console.log(selectedGrade);
			} else {
				console.log("Has Id: " + selectedGrade.value._id);
				var grade = {
					"_id": selectedGrade.value._id,
					"gradeLetter": selectedGrade.value.gradeLetter,
					"grade": selectedGrade.value.grade,
					"studentId": selectedGrade.value.studentId,
					"course": selectedGrade.value.course
				}

				let index = this.gradeList.indexOf(this.gradeList.find(({ _id }) => _id == selectedGrade.value._id))
				console.log(index);
				this.service.putService(this.collection, selectedGrade.value._id, grade)
					.subscribe(() => {
						this.gradeList[index] = grade;
						selectedGrade.reset();
						$("mat-form-field").removeClass('mat-form-field-invalid');

					});

				// console.log(selectedGrade.value._id);
			}
		}

		this.gradeForm.reset();
	}

	selectGrade(grade) {
		this.gradeForm.get('_id').setValue(grade._id);
		this.gradeForm.get('gradeLetter').setValue(grade.gradeLetter);
		this.gradeForm.get('grade').setValue(grade.grade);
		this.gradeForm.get('studentId').setValue(grade.studentId);
		this.gradeForm.get('course').setValue(grade.course);
		console.log(grade);
	}

	deleteGrade(grade: any) {
		let index = this.gradeList.indexOf(this.gradeList.find(({ _id }) => _id === grade._id))

		this.service.deleteService(this.collection, grade._id)
			.subscribe(
				(res: any) => alert(grade.gradeId + " " + res.message),
				error => console.log(error)
			);
		this.gradeList.splice(index, 1);
	}

	clearForm() {
		this.gradeForm.reset();
		$("mat-form-field").removeClass('mat-form-field-invalid');
	}

}
