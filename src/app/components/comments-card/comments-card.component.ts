import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-comments-card',
  templateUrl: './comments-card.component.html',
  styleUrls: ['./comments-card.component.css']
})
export class CommentsCardComponent {
  expand: boolean = true


  toggleCollapse () {
    this.expand = !this.expand
    console.log(this.expand)
  }
}
