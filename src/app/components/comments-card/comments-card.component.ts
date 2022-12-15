import { Component, Input } from '@angular/core';
import { CommentsModel } from 'src/app/models/comments';

@Component({
  selector: 'app-comments-card',
  templateUrl: './comments-card.component.html',
  styleUrls: ['./comments-card.component.css']
})
export class CommentsCardComponent {
  expand: boolean = true

  @Input() comment: CommentsModel

  toggleCollapse () {
    this.expand = !this.expand
    console.log(this.expand)
  }
}
