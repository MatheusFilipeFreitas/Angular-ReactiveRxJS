import {AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import {Course} from "../model/course";
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import * as moment from 'moment';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';
import { CoursesService } from '../services/courses.service';
import { LoadingService } from '../services/loading.service';

@Component({
    selector: 'course-dialog',
    templateUrl: './course-dialog.component.html',
    styleUrls: ['./course-dialog.component.css'],
    providers: [
        LoadingService // this is needed because this component is not reachable by the app.component (is instanciated by the angular materia)
    ]
})
export class CourseDialogComponent implements AfterViewInit {

    form: FormGroup;

    course:Course;

    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<CourseDialogComponent>,
        private coursesService: CoursesService,
        private loadingService: LoadingService,
        @Inject(MAT_DIALOG_DATA) course:Course) {

        this.course = course;

        this.form = fb.group({
            description: [course.description, Validators.required],
            category: [course.category, Validators.required],
            releasedAt: [moment(), Validators.required],
            longDescription: [course.longDescription,Validators.required]
        });
    }

    ngAfterViewInit() {

    }

    save() {

      const changes = this.form.value;

      const saveCourse$ = this.coursesService.saveCourse(this.course.id, changes);

      this.loadingService.showUntilCompleted(saveCourse$)
        .subscribe((val) => this.dialogRef.close(val)); //val in this case as a paramater of close, ensure if the object has been changed
    }

    close() {
        this.dialogRef.close();
    }

}
