import {Component} from '@angular/core';
import {NgForm} from '@angular/forms';
import {PostModel} from 'src/app/models/post';
import {DALService} from "../../services/database/dal.service";
import {AuthService} from "../../services/auth/auth.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent {

  post: PostModel = new PostModel();
  errorMessage: string="";
  categories:any= [];

  constructor(private dbContext: DALService, private auth: AuthService, private router:Router) {
  }

  OnInit(): void {
  }

  btnAdd_click() {
    alert("Record added successfully");
  }

  ngOnInit(): void {
    this.post = new PostModel();
    this.dbContext.getCategories().then(
      (res) => {
        this.categories = [...res];
        console.log(res)

      }).catch((err) => {
      this.errorMessage = err.message;
    });

  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      console.log(form)
      return;
    }

    this.post.userId = this.auth.user.userId;
    this.dbContext.addPost(this.post).then(
      (res) => {
        console.log(res)
        this.router.navigateByUrl("/posts");

      }).catch((err) => {
        this.errorMessage = err.message;
      });

  }


}
