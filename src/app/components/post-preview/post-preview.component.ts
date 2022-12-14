import { Component, Input, OnInit } from '@angular/core';
import { PostModel } from 'src/app/models/post';

@Component({
  selector: 'app-post-preview',
  templateUrl: './post-preview.component.html',
  styleUrls: ['./post-preview.component.css']
})
export class PostPreviewComponent implements OnInit {
  @Input() post: PostModel

  ngOnInit (): void {
    console.log(this.post)
  }
}
