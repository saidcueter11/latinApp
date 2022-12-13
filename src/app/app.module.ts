import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {SideMenuComponent} from './components/side-menu/side-menu.component';
import {HelloMessageComponent} from './components/hello-message/hello-message.component';
import {CategoryCardComponent} from './components/category-card/category-card.component';
import {PostPreviewComponent} from './components/post-preview/post-preview.component';
import {HomePageComponent} from './pages/home-page/home-page.component';
import {CommunityPageComponent} from './components/community-page/community-page.component';
import {DatabaseService} from "./services/database/database.service";
import {LoginComponent} from './pages/login/login.component';
import {RegisterComponent} from './pages/register/register.component';
import {FormsModule} from "@angular/forms";
import {AuthService} from "./services/auth/auth.service";
import {DALService} from "./services/database/dal.service";
import {AuthGuard} from "./guards/auth.guard";

@NgModule({
  declarations: [
    AppComponent,
    SideMenuComponent,
    HelloMessageComponent,
    CategoryCardComponent,
    PostPreviewComponent,
    HomePageComponent,
    CommunityPageComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    DatabaseService,
    AuthService,
    DALService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
