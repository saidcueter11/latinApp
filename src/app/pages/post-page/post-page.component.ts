import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.css']
})
export class PostPageComponent implements OnInit {
  previousePage () {
    history.back()
  }

  ngOnInit (): void {
    window.scrollTo(0, 0);
  }
}
