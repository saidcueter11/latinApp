import { Component, Input, OnInit } from '@angular/core';
import { pipe } from 'rxjs';
import { PostModel } from 'src/app/models/post';

@Component({
  selector: 'app-post-preview',
  templateUrl: './post-preview.component.html',
  styleUrls: ['./post-preview.component.css']
})
export class PostPreviewComponent implements OnInit {
  @Input() post: PostModel
  obj: string

  ngOnInit (): void {
    this.obj = JSON.stringify(this.post)
    console.log(this.post)
  }
}
