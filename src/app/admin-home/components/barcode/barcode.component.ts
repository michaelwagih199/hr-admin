import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DataService } from 'src/app/shared/service/data.service';
import LocationModel from '../../models/locationModel';

@Component({
  selector: 'app-barcode',
  templateUrl: './barcode.component.html',
  styleUrls: ['./barcode.component.scss'],
})
export class BarcodeComponent implements OnInit {
  model: LocationModel;
  code: any;
  constructor(
    private dialogRef: MatDialogRef<BarcodeComponent>,
    @Inject(MAT_DIALOG_DATA) data: any,
    private router: Router,
    private dataServer: DataService
  ) {
    this.model = data.model;
  }

  ngOnInit(): void {
    let finalData = {
      LATITUDE: this.model.LATITUDE,
      LONGITUDE: this.model.LONGITUDE
    };
    this.code = JSON.stringify(finalData);
  }

  onPrint() {
    this.dataServer.changeMessage(this.model);
    this.redirectTo(`/printing/parcode`);
    this.dialogRef.close();
  }

  close() {
    this.dialogRef.close();
  }

  redirectTo(uri: string) {
    this.router
      .navigateByUrl('/', { skipLocationChange: true })
      .then(() => this.router.navigate([uri]));
  }

  dateMsToDate(dateMs: any): string {
    var date = new Date(dateMs);
    var year = date.getFullYear();
    var month = ('0' + (date.getMonth() + 1)).slice(-2);
    var day = ('0' + date.getDate()).slice(-2);
    let parseDate = `${year}-${month}-${day}`; // 2011-05-09
    return parseDate;
  }
  
}
