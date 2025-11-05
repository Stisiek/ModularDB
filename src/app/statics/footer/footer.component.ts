import { Component } from '@angular/core';
import { SaveMgrService } from '../../services/save-mgr.service';
import { StateMgrService } from '../../services/state-mgr.service';
import { KeyValuePipe, NgForOf, NgIf } from '@angular/common';
import { Client, Template, TemplateNamesAndIds } from '../../api/steelService';
import { STATE } from '../../enums/STATE';
import { Confirmable } from '../../decorators/confirmable.decorator';
import { ConfirmationModalService } from '../../services/confirmation-modal.service';
import { FormsModule } from '@angular/forms';
import { TemplateService } from '../../services/template.service';

@Component({
  selector: 'app-footer',
  imports: [NgIf, NgForOf, FormsModule, KeyValuePipe],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  temps: {[id: string]: string} = {};

  oldTemplateName: string = '';
  newTemplateName: string = '';
  
  selectedTemplateId: string = 'newTemplate';

  constructor(private saveMgr: SaveMgrService, private stateMgr: StateMgrService, public confirmationModalService: ConfirmationModalService, private api: Client, private templateService: TemplateService) { }

  ngOnInit() {
    this.loadTemplateName();
  }

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
    if (this.stateMgr.getState() === STATE.FIELD_VIEW) {
      this.stateMgr.setState(STATE.FIELD_EDIT);
    } else if (this.stateMgr.getState() === STATE.TEMPLATE_VIEW) {
      this.stateMgr.setState(STATE.TEMPLATE_EDIT);
    } else if (this.stateMgr.getState() === STATE.RECORD_VIEW) {
      this.stateMgr.setState(STATE.RECORD_EDIT);
    }
  }

  @Confirmable('Chcesz porzucić zmiany i anulować?')
  cancelBtnClicked() {
    if (this.stateMgr.getState() === STATE.FIELD_EDIT) {
      this.stateMgr.setState(STATE.FIELD_VIEW);
      this.saveMgr.cancelBtnClicked();
    }
    if (this.stateMgr.getState() === STATE.TEMPLATE_EDIT) {
      this.stateMgr.setState(STATE.TEMPLATE_VIEW);
      this.saveMgr.cancelBtnClicked();
    }

    this.stateMgr.setEdited(false);
  }

  @Confirmable('Czy na pewno chcesz zapisać zmiany?')
  saveBtnClicked() {
    this.stateMgr.setEdited(false);
    this.saveMgr.saveBtnClicked(this.newTemplateName);
  }

  @Confirmable('Czy na pewno chcesz zresetować wartość wszystkich pól?')
  clearBtnClicked() {
    this.saveMgr.clearBtnClicked();
  }

  isSaveEnabled(): boolean {
    return this.stateMgr.isEdited() || this.templateNameDiffers();
  }

  templateNameDiffers(): boolean {
    return this.oldTemplateName !== this.newTemplateName;
  }

  loadTemplateName() {
    this.api.getAllTemplatesNames().then(result => {
      for (let temp of result) {
        this.temps[temp.id ?? ''] = temp.title ?? '';
      }
    });
  }

  async onTemplateSelect(templateId: string) {
    if (this.stateMgr.getState() === STATE.TEMPLATE_EDIT) {
      const previousTemplateId = this.selectedTemplateId;
      const confirmed = await this.confirmationModalService.confirm(
        'Czy na pewno chcesz zmienić szablon? Niezapisane zmiany zostaną utracone.'
      );
      
      if (!confirmed) {
        setTimeout(() => {
          this.selectedTemplateId = previousTemplateId;
        }, 0);
        return;
      }
    }

    if (templateId === 'newTemplate') {
      this.newTemplateName = this.oldTemplateName = '';
      this.templateService.templateSelected(0);
    } else {
      this.oldTemplateName = this.temps[templateId];
      this.newTemplateName = this.oldTemplateName;
      this.templateService.templateSelected(Number(templateId));
    }
  }

  addBtnClicked() {
    this.editBtnClicked();
  }

  showAdd() {
    return this.oldTemplateName === '' && this.stateMgr.getState() === STATE.TEMPLATE_VIEW;
  }
}
