import { Component } from '@angular/core';
import { QuickOptionsComponent } from "../quick-options/quick-options.component";
import { StateMgrService } from '../../services/state-mgr.service';
import { STATE } from '../../enums/STATE';

@Component({
  selector: 'app-header',
  imports: [QuickOptionsComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  appName = 'Steel App';

  constructor(private stateMgr: StateMgrService) { }

  navigateToHome() {
    this.stateMgr.setState(STATE.IDLE);
  }

  menuClick() {
    this.stateMgr.toggleMenu();
  }
}
