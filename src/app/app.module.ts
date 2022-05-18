import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ApiModule, AuthService, BASE_PATH, Configuration } from './api';
import { TokenService as TokenService } from './token-service.service';
import { environment } from 'src/environments/environment';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { SelectUserDialogComponent } from './select-user-dialog/select-user-dialog.component';
import { ChatComponent } from './chat/chat.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    LoginComponent,
    SelectUserDialogComponent,
    ChatComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    HttpClientModule,
    MatIconModule,
    FormsModule,
    ApiModule,
    MatCardModule,
    MatDialogModule,
    MatToolbarModule,
  ],
  providers: [
    {
      provide: Configuration,
      useFactory: (tokenService: TokenService) => {
        return new Configuration({
          basePath: environment.URL,
          credentials: {
            bearer: tokenService.getAccessToken.bind(tokenService),
          },
        });
      },
      deps: [TokenService],
      multi: false,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
