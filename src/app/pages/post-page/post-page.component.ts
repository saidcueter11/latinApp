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

    this.newComment.postId = this.post.postId
    this.newComment.userId = this.authService.user.userId;
    console.log(this.newComment)
    this.dbContext.addCommentToPost(this.newComment).then(
      (res) => {
        console.log(res)

        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(["/post", { post: JSON.stringify(this.post) }]);
        window.location.reload();
      }).catch((err) => {
        console.log("error")
      });
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
