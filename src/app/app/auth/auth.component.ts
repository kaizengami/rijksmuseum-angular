import {
  Component,
  OnInit,
  ViewChild,
  Output,
  EventEmitter,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponseData } from './auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  @ViewChild('authWrapper', { static: false }) authWrapper;
  @ViewChild('formDom', { static: false }) formDom;
  @ViewChild('formData', { static: false }) formData: NgForm;
  @Output() showLogin = new EventEmitter<boolean>();
  loading: boolean = false;
  error: string = null;
  signupMode: boolean = false;
  isAuthenticated = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.onDocumentClick = this.onDocumentClick.bind(this);
    document.addEventListener('click', this.onDocumentClick);

    this.authService.user.subscribe((user) => {
      this.isAuthenticated = !!user;
    });
  }

  onDocumentClick(event: MouseEvent) {
    if (this.formDom.nativeElement.contains(event.target)) {
      return;
    }
    if (this.authWrapper.nativeElement.contains(event.target)) {
      this.hideLogin();
    }
  }

  hideLogin(): void {
    this.showLogin.emit(false);
  }

  async onSubmit(form: NgForm) {
    let authObs;

    this.loading = true;

    try {
      if (this.signupMode) {
        authObs = await this.authService.signup({
          email: form.value.email,
          password: form.value.password,
        });
      } else {
        authObs = await this.authService.login({
          email: form.value.email,
          password: form.value.password,
        });
      }
      if (!authObs.user) throw authObs.message;
      this.hideLogin();
    } catch (error) {
      this.error = error;
    }

    this.loading = false;

    // authObs.catch((e) => {
    //   console.log(e);
    // });

    // authObs.subscribe(
    //   (response: any) => {
    //     console.log(response);
    //     this.hideLogin();
    //     this.loading = false;
    //   },
    //   (error: string) => {
    //     console.log(error);
    //     this.error = error;
    //     this.loading = false;
    //   }
    // );
  }

  handleSwitchForm(): void {
    this.signupMode = !this.signupMode;
  }
}
