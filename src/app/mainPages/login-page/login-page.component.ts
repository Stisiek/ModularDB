import { Component } from '@angular/core';
import { LoginMgrService } from '../../services/login-mgr.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  imports: [FormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  login: string = '';
  password: string = '';

  constructor(private loginMgr: LoginMgrService) { }

  ngOnInit() {
    // Initialize any necessary data or state
  }

  logIn() {
    this.loginMgr.logIn(this.login, this.password);
  }
}
