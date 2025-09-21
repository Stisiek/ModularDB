import { Component } from '@angular/core';
import { LoginMgrService } from '../../services/login-mgr.service';
import { NgIf } from '@angular/common';
import { StateMgrService } from '../../services/state-mgr.service';
import { STATE } from '../../enums/STATE';

@Component({
  selector: 'app-menu-pop-up',
  imports: [NgIf],
  templateUrl: './menu-pop-up.component.html',
  styleUrl: './menu-pop-up.component.css'
})
export class MenuPopUpComponent {

  constructor(private loginMgr: LoginMgrService, private stateMgr: StateMgrService) { }
  
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
  }

  search() {
    this.stateMgr.setState(STATE.MAIN_VIEW);
  }

  openTemplates() {
    this.stateMgr.setState(STATE.TEMPLATE_VIEW);
  }

  openDataFields() {
    this.stateMgr.setState(STATE.FIELD_VIEW);
  }

  manageBtnClick() {
    this.stateMgr.setState(STATE.SUPER_USER_PANEL_VIEW);
  }

  logout() {
    this.loginMgr.logOut();
    this.stateMgr.setState(STATE.IDLE);
  }
}
