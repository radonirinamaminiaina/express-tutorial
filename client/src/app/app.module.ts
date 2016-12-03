import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpRequestService } from './http-request.service';
import { AppComponent } from './app.component';
import { UserListComponent } from './user-list/user-list.component';
import { routing } from '../routing/routing';
import { HomeComponent } from './home/home.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { UserCreateComponent } from './user-create/user-create.component';
import { FlashMessageComponent } from './flash-message/flash-message.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    HomeComponent,
    EditUserComponent,
    UserCreateComponent,
    FlashMessageComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [HttpRequestService],
  bootstrap: [AppComponent]
})
export class AppModule { }
