import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent implements OnInit {
  @Input() userName: string
  @Input() category: string
  @Input() userId: number
  @Input() page: string

  randomUserImg: string

  ngOnInit (): void {
    this.randomUserImg = `https://randomuser.me/api/portraits/women/${this.userId}.jpg`
  }
}
