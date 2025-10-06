import { Component } from '@angular/core';
import { LoginMgrService } from '../../services/login-mgr.service';
import { NgIf } from '@angular/common';
import { StateMgrService } from '../../services/state-mgr.service';
import { STATE } from '../../enums/STATE';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-pop-up',
  imports: [NgIf],
  templateUrl: './menu-pop-up.component.html',
  styleUrl: './menu-pop-up.component.css'
})
export class MenuPopUpComponent {

  constructor(private loginMgr: LoginMgrService, private stateMgr: StateMgrService, private router: Router) { }
  
  isAdmin(): boolean {
    return this.loginMgr.isSuperUser();
  }

  isLoggedIn() {
    return this.loginMgr.isLoggedIn();
  }

  isMenuOpen(): boolean {
    return this.stateMgr.menuOpenStatus();
  }

  BtnClicked() {
    this.stateMgr.toggleMenu();
  }

  navigateToHome() {
    this.stateMgr.setState(STATE.IDLE);
    this.router.navigate(['/']);
  }

  search() {
    this.stateMgr.setState(STATE.MAIN_VIEW);
    this.router.navigate(['/search']);
  }

  openTemplates() {
    this.stateMgr.setState(STATE.TEMPLATE_VIEW);
    this.router.navigate(['/templates']);
  }

  openDataFields() {
    this.stateMgr.setState(STATE.FIELD_VIEW);
    this.router.navigate(['/fieldboxes']);
  }

  manageBtnClick() {
    this.stateMgr.setState(STATE.SUPER_USER_PANEL_VIEW);
    this.router.navigate(['/adminpanel']);
  }

  logout() {
    this.loginMgr.logOut();
    this.stateMgr.setState(STATE.IDLE);
    this.router.navigate(['/login']);
  }
}
