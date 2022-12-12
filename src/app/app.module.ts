import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { HelloMessageComponent } from './components/hello-message/hello-message.component';
import { CategoryCardComponent } from './components/category-card/category-card.component';
import { PostPreviewComponent } from './components/post-preview/post-preview.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { CommunityPageComponent } from './components/community-page/community-page.component';

@NgModule({
  declarations: [
    AppComponent,
    SideMenuComponent,
    HelloMessageComponent,
    CategoryCardComponent,
    PostPreviewComponent,
    HomePageComponent,
    CommunityPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
