import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PostModel } from 'src/app/models/post';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent {

  objPost: PostModel = new PostModel();
  // post: PostModel;
  // errorMessage: string;

  constructor() {
  }
  OnInit (): void { }
  btnAdd_click () {
    alert("Record added successfully");
  }

  ngOnInit (): void {
    this.objPost = new PostModel();
  }

  onSubmit (form: NgForm) {
    if (form.invalid) {
      return;
    }

  }
}
