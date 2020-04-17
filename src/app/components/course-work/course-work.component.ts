import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/general.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
	selector: 'app-course-work',
	templateUrl: './course-work.component.html',
	styleUrls: ['./course-work.component.css']
})
export class CourseWorkComponent implements OnInit {

	constructor(private service: GeneralService) { }
	public courseWorkList;
	private collection: string = "course-work";


	public courseWorkForm = new FormGroup({
		_id: new FormControl(''),//only for control purposes
		//Id: new FormControl(''),
		name: new FormControl(''),
		percentage: new FormControl(''),
		course: new FormControl(''),
		dueDate: new FormControl('')
	});


	ngOnInit() {
		this.getAllCourseWork();
	}

	getAllCourseWork() {
		return this.service.getService(this.collection).
			subscribe(x => this.courseWorkList = x)
	}


	onSubmitCourseWork(selectedCourseWork) {

		if (typeof selectedCourseWork.value._id == undefined || selectedCourseWork.value._id == null || selectedCourseWork.value._id == "") {
			console.log("id is null");
			console.log(selectedCourseWork.value);

			var addCourseWork = {
				//"_id": selectedCourseWork.value._id,
				"name": selectedCourseWork.value.name,
				"percentage": selectedCourseWork.value.percentage,
				"course": selectedCourseWork.value.course,
				"dueDate": selectedCourseWork.value.dueDate,
			}

			this.service.postService(this.collection, selectedCourseWork.value)
				//.subscribe(newCourseWork => this.courseWorkList.push(newCourseWork));
				.subscribe(() => {
					this.getAllCourseWork();
					selectedCourseWork.resetForm();
				});
		} else {
			console.log("Has Id: " + selectedCourseWork.value._id);
			var courseWork = {
				"_id": selectedCourseWork.value._id,
				"name": selectedCourseWork.value.name,
				"percentage": selectedCourseWork.value.percentage,
				"course": selectedCourseWork.value.course,
				"dueDate": selectedCourseWork.value.dueDate,
			}

			let index = this.courseWorkList.indexOf(this.courseWorkList.find(({ _id }) => _id == selectedCourseWork.value._id))
			console.log(index);
			this.service.putService(this.collection, selectedCourseWork.value._id, courseWork)
				.subscribe(() => this.courseWorkList[index] = courseWork)

			// console.log(selectedCourseWork.value._id);
		}

		this.courseWorkForm.reset();
	}

	selectCourseWork(courseWork) {
		this.courseWorkForm.get('_id').setValue(courseWork._id);
		this.courseWorkForm.get('name').setValue(courseWork.name);
		this.courseWorkForm.get('percentage').setValue(courseWork.percentage);
		this.courseWorkForm.get('course').setValue(courseWork.course);
		this.courseWorkForm.get('dueDate').setValue(courseWork.dueDate);
		console.log(courseWork);
	}

	deleteCourseWork(courseWork: any) {
		let index = this.courseWorkList.indexOf(this.courseWorkList.find(({ _id }) => _id === courseWork._id))

		this.service.deleteService(this.collection, courseWork._id)
			.subscribe(
				(res: any) => alert(courseWork._id + " " + res.message),
				error => console.log(error)
			);
		this.courseWorkList.splice(index, 1);
	}

	clearForm() {
		this.courseWorkForm.reset();
	}
}
