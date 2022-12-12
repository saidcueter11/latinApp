import {Component, OnInit} from '@angular/core';
import {UserModel} from "../../models/user";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: UserModel;

  constructor() {
  }

  ngOnInit() {
    this.user = new UserModel();

  }

  onSubmit(form:NgForm) {
    if(form.invalid){
      return;
    }
    console.log(this.user);
  }
}
