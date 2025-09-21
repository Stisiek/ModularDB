import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { RecordFinderComponent } from "../../mainPages/record-finder/record-finder.component";
import { AddFieldComponent } from "../../mainPages/add-field/add-field.component";
import { LoginPageComponent } from "../../mainPages/login-page/login-page.component";
import { SuperUserPanelComponent } from "../../mainPages/super-user-panel/super-user-panel.component";
import { MenuPopUpComponent } from "../menu-pop-up/menu-pop-up.component";
import { LoginMgrService } from '../../services/login-mgr.service';
import { NgIf } from '@angular/common';
import { StateMgrService } from '../../services/state-mgr.service';
import { STATE } from '../../enums/STATE';
import { EditTemplateComponent } from '../../mainPages/edit-template/edit-template.component';

@Component({
  selector: 'app-main-view',
  imports: [RecordFinderComponent, AddFieldComponent, LoginPageComponent, SuperUserPanelComponent, MenuPopUpComponent, EditTemplateComponent, NgIf],
  templateUrl: './main-view.component.html',
  styleUrl: './main-view.component.css'
})
export class MainViewComponent {
  readonly STATE = STATE;
  constructor(public loginMgr: LoginMgrService, public stateMgr: StateMgrService) { }
}
