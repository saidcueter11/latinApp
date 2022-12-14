import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommunityPageComponent } from './components/community-page/community-page.component';
import { PostPageComponent } from './pages/post-page/post-page.component';
import { AuthGuard } from "./guards/auth.guard";

import { HomePageComponent } from "./pages/home-page/home-page.component";
import { LoginComponent } from "./pages/login/login.component";
import { RegisterComponent } from "./pages/register/register.component";

const routes: Routes = [

  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomePageComponent, canActivate: [AuthGuard] },
  { path: 'post', component: PostPageComponent },
  { path: 'community', component: CommunityPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
