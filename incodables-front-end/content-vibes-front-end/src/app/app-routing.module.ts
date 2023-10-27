import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { GameSessionComponent } from './game-session/game-session.component';
import { UserLandingPageComponent } from './user-landing-page/user-landing-page.component';

const routes: Routes = [
  { path: 'homepage', component: HomepageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: '', redirectTo: '/homepage', pathMatch: 'full' }, // Default route
  { path: 'game-session', component: GameSessionComponent },
  {path: 'user-landing-page', component: UserLandingPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
