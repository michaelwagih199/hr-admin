import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import DepartmentModel from '../../models/departmentModel';
import EmployeeModel from '../../models/employee';
import LocationModel from '../../models/locationModel';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
})
export class EmployeeComponent implements OnInit {
  isLoading: boolean = false;
  isVisible: boolean = false;
  validateForm!: FormGroup;
  listOfData!: EmployeeModel[];
  departmentSet!: DepartmentModel[];
  locationsSet!: LocationModel[];
  departmentSelected!: any;
  locationSelected!: any;
  employee: EmployeeModel = new EmployeeModel();

  constructor(
    private fb: FormBuilder,
    private modal: NzModalService,
    private notification: NzNotificationService
  ) {}

  ngOnInit(): void {
    this.validatesForm();
    this.getAllEmployee();
  }

  /**data */
  getAllEmployee() {}

  /**event */

  onDelete(item: EmployeeModel) {}

  handleCancel() {
    this.isVisible = false;
  }

  openSaveModal() {
    this.isVisible = true;
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

  deleteDialog(item: any) {}

  /**ui ux */
  validatesForm() {
    this.validateForm = this.fb.group({
      employeeName: ['', [Validators.required]],
      employeAge: ['', [Validators.required]],
      departmentName: ['', [Validators.required]],
      locationName: ['', [Validators.required]],
    });
  }

  createNotification(type: string, title: string, description: any): void {
    this.notification.create(type, title, description);
  }
}
