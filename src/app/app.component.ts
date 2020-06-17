import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor() {}
  authVisible: boolean = false;

  ngOnInit(): void {}

  handleShowLogin(showLogin: boolean): void {
    this.authVisible = showLogin;
  }

  hideLogin(): void {
    this.authVisible = false;
  }
}
