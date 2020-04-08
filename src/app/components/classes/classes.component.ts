import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/general.service';
import { Classes } from 'src/app/models/classes';

@Component({
	selector: 'app-classes',
	templateUrl: './classes.component.html',
	styleUrls: ['./classes.component.css']
})
export class ClassesComponent implements OnInit {

	public classes: Classes;
	public programList;
	public classesList: Array<Classes>;

	constructor(private service: GeneralService) { }

	ngOnInit() {
		this.classes = new Classes();
		this.classesList = new Array<Classes>();
		this.fillClasses();
		this.fillPrograms();
	}

	/**
	 * @author Diego.Perez
	 * @date 04/05/2020
	 */
	fillPrograms() {
		let url: string = 'programs';

		this.service.getService(url).subscribe(
			(res) => {
				console.log(res)
				this.programList = res;
			},
			(err) => {
				console.log(err)
			}
		)
	}

	/**
	 * @author Diego.Perez.
	 * @date 04/05/2020.
	 */
	fillClasses() {
		let url: string = 'class';

		this.service.getService(url).subscribe(
			(res) => {
				console.log(res)
				this.classesList = res.data;
			},
			(err) => {
				console.log(err)
			}
		)
	}

	/**
	 * @author Diego.Perez.
	 * @date 04/05/2020
	 */
	editClass(value: Classes) {
		this.classes = value;
	}

	/**
	 * @author Diego.Perez.
	 * @date 04/05/2020
	 */
	onSubmit() {
		let url: string;
		if (!this.classes._id) {
			url = 'class';
		} else {
			url = 'class/update';
		}

		this.service.postService(url, this.classes).subscribe(
			(res) => {
				console.log(res)
				this.fillClasses();
				this.classes = new Classes();
			},
			(err) => {
				console.log(err)
			}
		)
	}

	/**
	 * 
	 * @param value 
	 * @author Diego.Perez.
	 * @date 04/05/2020
	 */
	deleteClass(value: Classes) {
		let url: string = 'class/delete';

		let data = {
			id: value._id
		}

		this.service.postService(url, data).subscribe(
			(res) => {
				console.log(res)
				this.fillClasses();
			},
			(err) => {
				console.log(err)
			}
		)
	}

	/**
	 * @author Diego.Perez.
	 * @date 04/05/2020
	 */
	clearForm() {
		this.classes = new Classes();
	}

}
