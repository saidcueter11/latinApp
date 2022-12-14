import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostModel } from 'src/app/models/post';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.css']
})
export class PostPageComponent implements OnInit {
  post: PostModel

  constructor(private route: ActivatedRoute) {

  }
  previousePage () {
    history.back()
  }

  ngOnInit (): void {
    window.scrollTo(0, 0);
    this.route.params.subscribe(params => this.post = JSON.parse(params['post']))
    console.log(this.post)
  }
}
