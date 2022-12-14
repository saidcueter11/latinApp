import {Component, OnInit} from '@angular/core';
import {UserModel} from "../../models/user";
import {NgForm} from "@angular/forms";
import {AuthService} from "../../services/auth/auth.service";
import {Route, Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: UserModel;
  errorMessage: string;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.user = new UserModel();

  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }

    this.authService.login(this.user).then(
      (res) => {
        if (res.code == 200) {
          this.router.navigateByUrl("/home")
        }

      }).catch((err) => {
        this.errorMessage = err.message;
      }
    );

  }
}
