import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { HomepageComponent } from './homepage/homepage.component';
import { RegistrationComponent } from './registration/registration.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { UserService } from './service/user-service/user.service';
import { LoginComponent } from './login/login.component';
import { GameSessionComponent } from './game-session/game-session.component';
import { UserLandingPageComponent } from './user-landing-page/user-landing-page.component';
import { CampaignSessionComponent } from './campaign-session/campaign-session.component';
import { DisplayGameSessionsComponent } from './display-game-sessions/display-game-sessions.component';
import { MusicSelectionComponent } from './music-selection/music-selection.component';


@NgModule({
  declarations: [
    AppComponent,
    AboutUsComponent,
    HomepageComponent,
    RegistrationComponent,
    LoginComponent,
    NavBarComponent,
    GameSessionComponent,
    UserLandingPageComponent,
    CampaignSessionComponent,
    DisplayGameSessionsComponent,
    MusicSelectionComponent,
  ],
  imports: [BrowserModule, FormsModule, AppRoutingModule, HttpClientModule],
  providers: [UserService, MusicSelectionComponent],
  

  bootstrap: [AppComponent]
})
export class AppModule {}
