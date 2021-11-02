import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import DepartmentModel from '../../models/departmentModel';
import EmployeeModel from '../../models/employee';
import LocationModel from '../../models/locationModel';
import { DepartmentService } from '../../services/department.service';
import { EmployeesService } from '../../services/employees.service';
import { map } from 'rxjs/operators';
import { LocationService } from '../../services/location.service';
import employee from '../../models/employee';
import { MatDialog } from '@angular/material/dialog';
import { BarcodeComponent } from '../barcode/barcode.component';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
})
export class EmployeeComponent implements OnInit {
  isLoading: boolean = false;
  isVisible: boolean = false;
  validateForm!: FormGroup;
  employeeSet!: EmployeeModel[];
  departmentSet!: DepartmentModel[];
  locationsSet!: LocationModel[];
  departmentSelected!: any;
  locationSelected!: any;
  employee: EmployeeModel = new EmployeeModel();
  location: LocationModel = new LocationModel();
  department: DepartmentModel = new DepartmentModel();

  constructor(
    private fb: FormBuilder,
    private modal: NzModalService,
    private notification: NzNotificationService,
    private employeeService: EmployeesService,
    private departmentService: DepartmentService,
    private locationService: LocationService,

  ) {}

  ngOnInit(): void {
    this.validatesForm();
    this.getAllEmployee();
    this.getAllDepartments();
    this.getAllLocationData();
  }

  /**data */
  getAllEmployee() {
    this.isLoading = true;
    this.employeeService
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
        console.log(data);

        this.isLoading = false;
        this.employeeSet = data;
      });
  }




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
        this.departmentSet = data;
      });
  }

  getAllLocationData() {
    this.isLoading = true;
    this.locationService
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
        this.locationsSet = data;
      });
  }

  /**event */

  onDelete(item: EmployeeModel) {
    this.modal.confirm({
      nzTitle: 'Are you sure delete this ?',
      nzContent:
        '<b style="color: red;"> Empployee :' + item.employeeName + '</b>',
      nzOkText: 'Yes',
      nzOkType: 'danger',
      nzOnOk: () => {
        this.isLoading = true;
        this.employeeService.delete(item.id).then(
          (response) => {
            this.isLoading = false;
            this.createNotification(
              'success',
              'Success',
              ' Deleted succesfully'
            );
            this.getAllEmployee();
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

  onLocationChange(value: any) {
    this.employee.location = value;
  }

  onDepartmentChange(value: any) {
    this.employee.department = value;
  }

  showModal() {
    this.employee = new EmployeeModel();
    this.isVisible = true;
  }

  handleCancel() {
    this.isVisible = false;
  }

  openSaveModal() {
    this.isVisible = true;
  }

  save(): void {
    this.isLoading = true;
    this.employeeService.create(this.employee).then(() => {
      this.createNotification(
        'success',
        'Success',
        'Department Saved Succesfully'
      );
      this.isLoading = false;
      this.isVisible = false;
    });
  }

  /**ui ux */
  validatesForm() {
    this.validateForm = this.fb.group({
      employeeName: ['', [Validators.required]],
      employeAge: ['', [Validators.required]],
      departmentName: ['', [Validators.required]],
      locationName: ['', [Validators.required]],
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  createNotification(type: string, title: string, description: any): void {
    this.notification.create(type, title, description);
  }
}
