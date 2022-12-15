import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommentsModel } from 'src/app/models/comments';
import { PostModel } from 'src/app/models/post';
import { AuthService } from 'src/app/services/auth/auth.service';
import { DALService } from 'src/app/services/database/dal.service';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.css']
})
export class PostPageComponent implements OnInit {
  post: PostModel
  comments: CommentsModel[]
  newComment: CommentsModel = {
    commentId: 0,
    creationDate: "",
    description: "",
    postId: 0,
    userId: 0,
    userName: ""
  }

  constructor(private route: ActivatedRoute, private dbContext: DALService, private authService: AuthService, private router: Router) {

  }
  previousePage () {
    history.back()
  }

  createComment (form: NgForm) {
    if (form.invalid) {
      return;
    }

    // this.dbContext.addCommentToPost().then(
    //   (res) => {
    //     if (res.code == 200) {
    //       this.router.navigateByUrl("/home")
    //     }

    //   }).catch((err) => {
    //     this.errorMessage = err.message;
    //   }
    //   );
  }

  ngOnInit (): void {
    window.scrollTo(0, 0);
    this.route.params.subscribe(params => this.post = JSON.parse(params['post']))
    this.dbContext.getCommentsByPostId(this.post.postId).then((data: CommentsModel[]) => {
      this.comments = data
    }
    )
  }
}
