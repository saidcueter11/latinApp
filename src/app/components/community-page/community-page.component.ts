import { Component, OnInit } from '@angular/core';
import { PostModel } from 'src/app/models/post';
import { DALService } from 'src/app/services/database/dal.service';

@Component({
  selector: 'app-community-page',
  templateUrl: './community-page.component.html',
  styleUrls: ['./community-page.component.css']
})
export class CommunityPageComponent implements OnInit {
  posts: PostModel[]
  noPost: string = ""

  constructor(private dbContext: DALService) {

  }

  ngOnInit (): void {
    this.dbContext.getPosts().then((posts: PostModel[]) => {
      this.posts = posts
      console.log(this.posts);
    }).catch(e => this.noPost = "No post where found")
  }
}
