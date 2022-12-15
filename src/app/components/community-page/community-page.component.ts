import { Component, OnInit } from '@angular/core';
import { CategoryModel } from 'src/app/models/category';
import { PostModel } from 'src/app/models/post';
import { AuthService } from 'src/app/services/auth/auth.service';
import { DALService } from 'src/app/services/database/dal.service';

@Component({
  selector: 'app-community-page',
  templateUrl: './community-page.component.html',
  styleUrls: ['./community-page.component.css']
})
export class CommunityPageComponent implements OnInit {
  posts: PostModel[]
  categories: CategoryModel[]
  noPost: string = ""
  filteredByCategories: PostModel[] = []

  constructor(private dbContext: DALService, private auth: AuthService) {

  }

  onClick (id: number) {
    const newPost: PostModel[] = []
    for (let index = 0;index < this.posts.length;index++) {
      if (this.posts[index].categoryId === id) {
        newPost.push(this.posts[index])
      }
    }

    this.filteredByCategories = newPost
  }

  ngOnInit (): void {
    this.dbContext.getPosts(this.auth.user.userId).then((posts: PostModel[]) => {
      this.posts = posts
    }).catch(e => this.noPost = "No post where found")

    this.dbContext.getCategories().then((categories: CategoryModel[]) => this.categories = categories)
  }
}
