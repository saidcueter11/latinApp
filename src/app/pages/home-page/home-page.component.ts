import { Component, OnInit } from '@angular/core';
import { PostModel } from 'src/app/models/post';
import { CategoryModel } from 'src/app/models/category';
import { UserModel } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth/auth.service';
import { DALService } from 'src/app/services/database/dal.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  posts: PostModel[]
  categories: CategoryModel[]
  noPost: string = ""
  user: UserModel

  constructor(private dbContext: DALService, private auth: AuthService) {

  }

  ngOnInit (): void {
    this.dbContext.getFavoritesPostsByUserId(3).then((posts: PostModel[]) => {
      this.posts = posts
      console.log(this.posts);
    }).catch(e => this.noPost = "No post where found")

    this.dbContext.getFavoritesByUserId(3).then((categories: CategoryModel[]) => {
      console.log(categories)
      this.categories = categories
    })
    this.user = this.auth.user
    console.log(this.user)
  }
}
