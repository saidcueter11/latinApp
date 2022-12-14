import { Component, OnInit } from '@angular/core';
import { PostModel } from 'src/app/models/post';
import { AuthService } from 'src/app/services/auth/auth.service';
import { DALService } from 'src/app/services/database/dal.service';

@Component({
  selector: 'app-my-posts-page',
  templateUrl: './my-posts-page.component.html',
  styleUrls: ['./my-posts-page.component.css']
})
export class MyPostsPageComponent implements OnInit {
  posts: PostModel[]

  constructor(private dbContext: DALService, private auth: AuthService) {

  }

  ngOnInit (): void {
    this.dbContext.getPostsByUserId(this.auth.user.userId).then(posts => this.posts = posts)
  }
}
