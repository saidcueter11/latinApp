import { Component, OnInit } from '@angular/core';
import { PostModel } from 'src/app/models/post';
import { UserModel } from 'src/app/models/user';
import { DALService } from 'src/app/services/database/dal.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  posts: PostModel[]

  constructor(private dbContext: DALService) {

  }

  ngOnInit (): void {
    this.dbContext.getPostsByUserId(3).then((posts: PostModel[]) => {
      this.posts = posts
      console.log(this.posts);
    })
  }



}
