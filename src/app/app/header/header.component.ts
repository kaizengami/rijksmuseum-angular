import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  @Output() showLogin = new EventEmitter<boolean>();
  search: string = '';

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
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
}
