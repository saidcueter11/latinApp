import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-hello-message',
  templateUrl: './hello-message.component.html',
  styleUrls: ['./hello-message.component.css']
})
export class HelloMessageComponent {
  @Input() userName: string
}
