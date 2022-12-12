import {Component, OnInit} from '@angular/core';
import {UserModel} from "../../models/user";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  user?: UserModel;

  constructor() {
  }

  ngOnInit() {
    this.user = new UserModel();

  }
}
