import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';
import { map } from 'rxjs/operators';
import UsersModel from 'src/app/core/model/users';
import { AngularFirestore } from '@angular/fire/firestore';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  userList?: UsersModel[];

  constructor(
    private router: Router,
    private userService: UserService,
    private db: AngularFirestore,
    private notification: NzNotificationService
  ) {}

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.form);
    this.userService
      .isUser(this.form.username, this.form.password)
      .valueChanges()
      .subscribe((data: any) => {
        console.log(data[0]);
        if (!data[0])
          this.createNotification('error', 'error', 'Credentials Not Valid');
        else this.reloadPage();
      });
  }

  retrieveTutorials(): void {
    
    
    this.userService
      .isUser(this.form.username, this.form.username)
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
        this.userList = data;
        console.log(data);
      });
  }

  /**uiux */
  createNotification(type: string, title: string, description: any): void {
    this.notification.create(type, title, description);
  }

  reloadPage() {
    this.router.navigateByUrl('/admin');
  }
}
