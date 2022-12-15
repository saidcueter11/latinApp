import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  constructor(private route: ActivatedRoute, private dbContext: DALService) {

  }
  previousePage () {
    history.back()
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
