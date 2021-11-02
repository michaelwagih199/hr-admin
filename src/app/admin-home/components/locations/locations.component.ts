import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import LocationModel from '../../models/locationModel';
import { NzModalService } from 'ng-zorro-antd/modal';
import { LocationService } from '../../services/location.service';
import { map } from 'rxjs/operators';
import EmployeeModel from '../../models/employee';
import { BarcodeComponent } from '../barcode/barcode.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss'],
})
export class LocationsComponent implements OnInit {
  isLoading: boolean = false;
  listOfData!: LocationModel[];
  isVisible: boolean = false;
  validateForm!: FormGroup;
  location: LocationModel = new LocationModel();

  constructor(
    private notification: NzNotificationService,
    private modal: NzModalService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private locationService: LocationService
  ) {}

  ngOnInit(): void {
    this.validatesForm();
    this.getAllLocationData();
  }
  /**data */

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
        this.listOfData = data;
      });
  }

  /**event */

  showModal() {
    this.isVisible = true;
  }

  onBarcode(element: LocationModel) {
    // this.isLoading = true;
    const dialogRef = this.dialog.open(BarcodeComponent, {
      data: {
        model: element,
      },
    });
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        const a = document.createElement('a');
        a.click();
        a.remove();
      }
    });
  }

  onDelete(item: LocationModel): void {
    this.modal.confirm({
      nzTitle: 'Are you sure delete this Department?',
      nzContent:
        '<b style="color: red;">Department : ' + item.locationName + '</b>',
      nzOkText: 'Yes',
      nzOkType: 'danger',
      nzOnOk: () => {
        this.isLoading = true;
        this.locationService.delete(item.id).then(
          (response) => {
            this.isLoading = false;
            this.createNotification(
              'success',
              'Success',
              'Deleted succesfully'
            );
            this.getAllLocationData();
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

  save() {
    this.isLoading = true;
    this.locationService.create(this.location).then(() => {
      this.createNotification(
        'success',
        'Success',
        'Location Saved Succesfully'
      );
      this.isLoading = false;
      this.isVisible = false;
    });
  }

  handleCancel() {
    this.isVisible = false;
  }

  /**ui ux */
  validatesForm() {
    this.validateForm = this.fb.group({
      departmentName: ['', [Validators.required]],
      locationUrl: ['', [Validators.required]],
      longitude: ['', [Validators.required]],
      latitude: ['', [Validators.required]],
    });
  }

  createNotification(type: string, title: string, description: any): void {
    this.notification.create(type, title, description);
  }

  getLattitudeAndLangtude(url: string) {
    var mySubString = url.substring(
      url.lastIndexOf('@') + 1,
      url.lastIndexOf('/data')
    );
    let values = {
      LATITUDE: mySubString.split(',')[0],
      LONGITUDE: mySubString.split(',')[1],
    };
    return values;
  }
}
