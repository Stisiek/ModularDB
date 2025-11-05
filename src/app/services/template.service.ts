import { EventEmitter, Injectable, Output } from '@angular/core';
import { Client, FieldBox, Template } from '../api/steelService';
import { LoginMgrService } from './login-mgr.service';

@Injectable({
  providedIn: 'root'
})
export class TemplateService {
  private loadedFields: FieldBox[] = [];

  @Output() templateChanged: EventEmitter<Template> = new EventEmitter<Template>();

  constructor(private api: Client, private loginMgr: LoginMgrService) { }

  getFields(): Promise<FieldBox[]> {
    return this.loadedFields.length > 0 ? Promise.resolve(this.loadedFields) : this.loadFields().then(() => this.loadedFields);
  }

  async loadFields(): Promise<FieldBox[]> {
    return await this.api.getAllRawFields(this.loginMgr.getToken()).then(fields => {
      this.loadedFields = fields;
      return fields;
    });
  }

  templateSelected(templateId?: number) {
    if (templateId) {
      this.api.getWholeTemplate(templateId).then(template => {
        this.templateChanged.emit(template);
      });
    } else {
      let temp = new Template();
      temp.id = -1;
      this.templateChanged.emit(temp);
    }
  }
}
