import { Component } from '@angular/core';
import { SaveMgrService } from '../../services/save-mgr.service';
import { StateMgrService } from '../../services/state-mgr.service';
import { NgForOf, NgIf } from '@angular/common';
import { Template } from '../../api/steelService';
import { STATE } from '../../enums/STATE';

@Component({
  selector: 'app-footer',
  imports: [NgIf, NgForOf],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  templates: Template[] = [];

  constructor(private saveMgr: SaveMgrService, private stateMgr: StateMgrService) { }

  isEditing() {
    return this.stateMgr.isEditing();
  }

  isTemplateEdit() {
    return this.stateMgr.isTemplateEdit();
  }

  isTemplate(): boolean {
    return this.stateMgr.isTemplate();
  }

  showEditButton() : boolean {
    return this.stateMgr.getState() === STATE.FIELD_VIEW || 
    this.stateMgr.getState() === STATE.TEMPLATE_VIEW || 
    this.stateMgr.getState() === STATE.RECORD_VIEW || 
    this.stateMgr.getState() === STATE.SUPER_USER_PANEL_VIEW;
  }

  editBtnClicked() {
    this.stateMgr.setState(STATE.FIELD_EDIT);
  }

  cancelBtnClicked() {
    if (this.stateMgr.getState() === STATE.FIELD_EDIT) {
      this.stateMgr.setState(STATE.FIELD_VIEW);
    }
  }
}
