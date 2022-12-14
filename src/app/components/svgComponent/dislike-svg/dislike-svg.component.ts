import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dislike-svg',
  templateUrl: './dislike-svg.component.html',
  styleUrls: ['./dislike-svg.component.css']
})
export class DislikeSvgComponent {
  @Input() isLiked: number | null
}
