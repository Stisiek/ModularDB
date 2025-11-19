import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { STATE } from '../../enums/STATE';
import { Router } from '@angular/router';
import { StateMgrService } from '../../services/state-mgr.service';
import { LoginMgrService } from '../../services/login-mgr.service';

@Component({
  selector: 'app-tiles-page',
  imports: [NgIf],
  templateUrl: './tiles-page.component.html',
  styleUrl: './tiles-page.component.css'
})
export class TilesPageComponent {
  STATE = STATE;

  constructor(private router: Router, private stateMgr: StateMgrService, private loginMgr: LoginMgrService) {}

  isSuperUser() {
    return this.loginMgr.isSuperUser();
  }

  goSomewhereElse(state: STATE) {
    switch(state) {
      case STATE.MAIN_VIEW:
        this.stateMgr.setState(STATE.MAIN_VIEW);
        this.router.navigate(['/search']);
        break;
      case STATE.TEMPLATE_VIEW:
        this.stateMgr.setState(STATE.TEMPLATE_VIEW);
        this.router.navigate(['/templates']);
        break;
      case STATE.FIELD_VIEW:
        this.stateMgr.setState(STATE.FIELD_VIEW);
        this.router.navigate(['/fieldboxes']);
        break;
      case STATE.SUPER_USER_PANEL_VIEW:
        this.stateMgr.setState(STATE.SUPER_USER_PANEL_VIEW);
        this.router.navigate(['/adminpanel']);
        break;
      case STATE.RECORD_CREATE:
        this.stateMgr.setState(STATE.RECORD_CREATE);
        this.router.navigate(['/search/add']);
        break;
    }
  }
}
