import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/general.service';
import { Student } from 'src/app/models/student';
import { DatePipe } from '@angular/common';

@Component({
	selector: 'app-students',
	templateUrl: './students.component.html',
	styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {

	public studentList: Array<Student>;
	public student: Student;


	public programList = [
		{
			programId: 'SCAT',
			programName: 'Computer Software and Database Development'
		},
		{
			programId: 'MMPT',
			programName: 'Marketing Managment and Professionals Sales'
		}
	];

	public classesList = [
		{
			classId: 'CSD_4403_2',
			className: 'Enterprise Technologies'
		},
		{
			classId: 'CSD_1134_2',
			className: 'Wen Technologies III'
		},
		{
			classId: 'CSD_2547_1',
			className: 'Database Design'
		},
	];

	constructor(private service: GeneralService, public datepipe: DatePipe) { }

	ngOnInit() {
		this.student = new Student();
		this.studentList = new Array<Student>();
		this.loadStudents();
	}

	/**
	 * @author Diego.Perez.
	 * @date 04/01/2020
	 */
	loadStudents() {
		let url: string = "student";

		this.service.getService(url).subscribe(
			(res) => {
				console.log(res)
				if (res.code == 'Ok') {
					this.studentList = res.data;
				}
			},
			(err) => {
				console.log(err)
			}
		)
	}

	/**
	 * @author Diego.Perez
	 * @date 04/01/2020
	 */
	onSubmit(studentForm) {
		if (studentForm.valid) {
			let url: string;
			if (!this.student._id) {
				console.log(this.student._id);
				url = 'student';
			} else {
				url = 'student/update';
			}
			console.log(url)
			this.service.postService(url, this.student).subscribe(
				(res) => {
					console.log(res);
					this.loadStudents();
					this.student = new Student();
					studentForm.resetForm();
				},
				(err) => {
					console.log(err);
				}
			)
		}
	}

	/**
	 * @author Diego.Perez.
	 * @date 04/05/2020
	 */
	deleteStudent(value: Student) {
		let url: string = 'student/delete';
		let data = {
			"id": value._id
		};

		this.service.postService(url, data).subscribe(
			(res) => {
				console.log(res)
				this.loadStudents()
			},
			(err) => {
				console.log(err)
			}
		)
	}

	/**
	 * 
	 * @param value 
	 * @autho Diego.Perez.
	 * @date 04/01/2020
	 */
	editStudent(value: Student) {
		this.student = new Student();
		this.student._id = value._id;
		this.student.classes = value.classes;
		this.student.email = value.email;
		this.student.firstName = value.firstName;
		this.student.lastName = value.lastName;
		this.student.programId = value.programId;
		this.student.studentId = value.studentId;
	}

	/**
	 * @author Diego.Perez
	 * @date 04/02/2020.
	 */
	clearForm() {
		this.student = new Student();
	}

}
