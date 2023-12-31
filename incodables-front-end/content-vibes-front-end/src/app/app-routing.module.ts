import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { GameSessionComponent } from './game-session/game-session.component';
import { UserLandingPageComponent } from './user-landing-page/user-landing-page.component';
import { CampaignSessionComponent } from './campaign-session/campaign-session.component';
import { DisplayGameSessionsComponent } from './display-game-sessions/display-game-sessions.component';

const routes: Routes = [
  { path: 'homepage', component: HomepageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: '', redirectTo: '/homepage', pathMatch: 'full' },
  { path: '', redirectTo: '/user-landing-page', pathMatch: 'full' },
  { path: 'game-session-form/:campaignId', component: GameSessionComponent },
  { path: 'user-landing-page', component: UserLandingPageComponent },
  { path: 'campaign-session', component: CampaignSessionComponent },
  { path: 'display-game-session', component: DisplayGameSessionsComponent },
  { path: 'logout', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
