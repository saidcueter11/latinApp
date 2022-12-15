import {Component, OnInit} from '@angular/core';
import {UserModel} from "../../models/user";
import {AuthService} from "../../services/auth/auth.service";
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  user: UserModel;
  errorMessage: string;

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
    this.user = new UserModel();

  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }

    this.authService.register(this.user).then(
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
