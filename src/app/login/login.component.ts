import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService, ChatService, DefaultService } from '../api';
import { constants } from '../constants';
import { TokenService as TokenService } from '../token-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  username?: string;
  password?: string;
  token?: string;
  stuff?: string;

  constructor(
    private authService: AuthService,
    private tokenService: TokenService,
    private defaultService: DefaultService,
    private snackbar: MatSnackBar,
    private router: Router
  ) {}

  async register() {
    if (!this.username || !this.password) return;

    const response = await this.authService
      .authControllerRegister({
        username: this.username,
        password: this.password,
      })
      .toPromise();

    this.snackbar.open('Success!', undefined, {
      duration: constants.ANIMATION_DURATION,
    });
  }

  async login() {
    if (!this.username || !this.password) return;

    const res = await this.authService
      .authControllerLogin({ username: this.username, password: this.password })
      .toPromise();
    this.token = res.access_token;
    this.tokenService.setAccessToken(this.token);

    this.snackbar.open('Success!', undefined, {
      duration: constants.ANIMATION_DURATION,
    });
    this.router.navigate(['main']);
  }

  async getStuff() {
    const res = await this.defaultService.appControllerGetAnyUser().toPromise();

    this.snackbar.open(JSON.stringify(res), undefined, {
      duration: constants.ANIMATION_DURATION,
    });
  }

  ngOnInit(): void {
    if (this.tokenService.getAccessToken()) {
      this.router.navigate(['main']);
    }
  }
}
