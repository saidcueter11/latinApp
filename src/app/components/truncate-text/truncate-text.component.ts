import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-truncate-text',
  templateUrl: './truncate-text.component.html',
  styleUrls: ['./truncate-text.component.css']
})
export class TruncateTextComponent {
  @Input() text: string
  @Input() expand: boolean

  truncateClass = {
    'display': '-webkit-box !important',
    '-webkit-line-clamp': '2',
    '-webkit-box-orient': 'vertical',
    'white-space': 'normal'
  }
}
