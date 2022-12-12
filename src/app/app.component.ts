import {Component, OnInit} from '@angular/core';
import {DatabaseService} from "./services/database/database.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'latinApp';
  private databaseService: DatabaseService;

  constructor(databaseService: DatabaseService) {
    this.databaseService = databaseService
  }

  ngOnInit(): void {
    this.databaseService.initDB();
  }

}
