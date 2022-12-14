import { Component, OnInit } from '@angular/core';
import { PostModel } from 'src/app/models/post';
import { DALService } from 'src/app/services/database/dal.service';

@Component({
  selector: 'app-my-posts-page',
  templateUrl: './my-posts-page.component.html',
  styleUrls: ['./my-posts-page.component.css']
})
export class MyPostsPageComponent implements OnInit {
  posts: PostModel[]

  constructor(private dbContext: DALService) {

  }

  ngOnInit (): void {
    this.dbContext.getPostsByUserId(1).then(posts => this.posts = posts)
  }
}
