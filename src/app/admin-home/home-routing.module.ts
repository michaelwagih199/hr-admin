import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from '../shared/components';
import { DepartmentComponent } from './components/department/dep-loc.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { AdminHomeComponent } from './components/home/home.component';
import { NotificationComponent } from './components/notification/notification.component';
import { ReportComponent } from './components/report/report.component';
import { LocationsComponent } from './components/locations/locations.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: AdminHomeComponent,
      },
      {
        path: 'employees',
        component: EmployeeComponent,
      },
      {
        path: 'reports',
        component: ReportComponent,
      },
      {
        path: 'notifications',
        component: NotificationComponent,
      },
      {
        path: 'department',
        component: DepartmentComponent,
      },
      {
        path: 'locations',
        component: LocationsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
