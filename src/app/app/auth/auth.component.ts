import {
  Component,
  OnInit,
  ViewChild,
  Output,
  EventEmitter,
} from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  @ViewChild('authWrapper', { static: false }) authWrapper;
  @ViewChild('formDom', { static: false }) formDom;
  @ViewChild('formData', { static: false }) formData;
  @Output() showLogin = new EventEmitter<boolean>();

  constructor() {}

  ngOnInit(): void {
    this.onDocumentClick = this.onDocumentClick.bind(this);
    document.addEventListener('click', this.onDocumentClick);
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

  onSubmit(form: NgForm): void {
    console.log(form.value);
  }

  handleSignup(): void {
    console.log('handle Signup');
    console.log(this.formData.value);
  }
}
