import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() showLogin = new EventEmitter<boolean>();
  private userSub: Subscription;
  isAuthenticated = false;
  search = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.updateSearchInputFromUrl();

    this.userSub = this.authService.user.subscribe((user) => {
      this.isAuthenticated = !!user;
    });
  }

  updateSearchInputFromUrl(): void {
    this.route.queryParams.subscribe((queryParams: Params) => {
      this.search = queryParams.search ? queryParams.search : '';
    });
  }

  handleSubmit(): void {
    this.search == ''
      ? this.router.navigate([''], {
          queryParams: {
            search: null,
          },
          queryParamsHandling: 'merge',
        })
      : this.router.navigate([''], {
          queryParams: { search: this.search },
          queryParamsHandling: 'merge',
        });
  }

  handleLogin(): void {
    this.showLogin.emit(true);
  }

  handleLogout(): void {
    console.log('handleLogout');
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
