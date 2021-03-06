import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedRoutingModule } from './shared-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import * as fromComponents from './components';
import { NgMaterialModule } from './components/ng-material/ng-material.module';
import { ConfirmationDialog } from './components/layout/dialog/confirmation/confirmation.component';
import { AboutAppDialogComponent } from './components/layout/dialog/about-app-dialog/about-app-dialog.component';
import { NgZorroModule } from './components/ng-zorro/ng-zorro.module';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { QRCodeModule } from 'angular2-qrcode';

@NgModule({
  declarations: [...fromComponents.components, ConfirmationDialog, AboutAppDialogComponent],
  imports: [
    CommonModule,
    SharedRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    RouterModule,
    NgMaterialModule,
    NgZorroModule,
    NgbCarouselModule,
    QRCodeModule
   ],
  exports: [   
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule,
    CommonModule,
    NgMaterialModule,
    NgZorroModule,
    NgbCarouselModule,
    QRCodeModule
  ]
})
export class SharedModule { }
