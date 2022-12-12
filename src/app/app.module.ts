import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {SideMenuComponent} from './components/side-menu/side-menu.component';
import {DatabaseService} from "./services/database/database.service";

@NgModule({
  declarations: [
    AppComponent,
    SideMenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [DatabaseService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
