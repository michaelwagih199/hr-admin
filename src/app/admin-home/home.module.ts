import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { AdminHomeComponent } from './components/home/home.component';
import { SharedModule } from '../shared/shared.module';
import { EmployeeComponent } from './components/employee/employee.component';
import { ReportComponent } from './components/report/report.component';
import { NotificationComponent } from './components/notification/notification.component';
import { DepartmentComponent } from './components/department/dep-loc.component';
import { LocationsComponent } from './components/locations/locations.component';
import { BarcodeComponent } from './components/barcode/barcode.component';

@NgModule({
  declarations: [
    AdminHomeComponent,
    EmployeeComponent,
    ReportComponent,
    NotificationComponent,
    DepartmentComponent,
    BarcodeComponent,
    LocationsComponent,
  ],
  imports: [CommonModule, HomeRoutingModule, SharedModule],
})
export class AdminHomeModule {}
