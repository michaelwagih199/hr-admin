import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import DepartmentModel from '../../models/departmentModel';
import { DepartmentService } from '../../services/department.service';
import { map } from 'rxjs/operators';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-dep-loc',
  templateUrl: './dep-loc.component.html',
  styleUrls: ['./dep-loc.component.scss'],
})
export class DepartmentComponent implements OnInit {
  listOfData!: DepartmentModel[];
  isVisible = false;
  isLoading = false;
  validateForm!: FormGroup;
  departmentModel: DepartmentModel = new DepartmentModel();

  constructor(
    private fb: FormBuilder,
    private departmentService: DepartmentService,
    private notification: NzNotificationService,
    private modal: NzModalService
  ) {}

  ngOnInit(): void {
    this.validatesForm();
    this.getAllDepartments();
  }

  /**data */

  getAllDepartments(): void {
    this.isLoading = true;
    this.departmentService
      .getAll()
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({
            _id: c.payload.doc.id,
            get id() {
              return this._id;
            },
            set id(value) {
              this._id = value;
            },
            ...c.payload.doc.data(),
          }))
        )
      )
      .subscribe((data) => {
        this.isLoading = false;
        this.listOfData = data;
      });
  }

  /**events */
  showModal(): void {
    this.departmentModel = new DepartmentModel();
    this.isVisible = true;
  }

  onDelete(item: DepartmentModel): void {
    this.modal.confirm({
      nzTitle: 'Are you sure delete this Department?',
      nzContent:
        '<b style="color: red;">Department : ' + item.departmentName + '</b>',
      nzOkText: 'Yes',
      nzOkType: 'danger',
      nzOnOk: () => {
        this.isLoading = true;
        this.departmentService.delete(item.id).then(
          (response) => {
            this.isLoading = false;
            this.createNotification(
              'success',
              'Success',
              'Department Deleted succesfully'
            );
            this.getAllDepartments();
          },
          (error) => {
            this.isLoading = false;
            console.log(error);
          }
        );
      },
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel'),
    });
  }

  save(): void {
    this.isLoading = true;
    this.departmentService.create(this.departmentModel).then(() => {
      this.createNotification(
        'success',
        'Success',
        'Department Saved Succesfully'
      );
      this.isLoading = false;
      this.isVisible = false;
    });
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  /**ui ux */
  validatesForm() {
    this.validateForm = this.fb.group({
      departmentName: ['', [Validators.required]],
    });
  }

  createNotification(type: string, title: string, description: any): void {
    this.notification.create(type, title, description);
  }
}
