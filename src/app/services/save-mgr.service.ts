import { EventEmitter, Injectable, Output } from '@angular/core';
import { Client, FieldBox, InsertFieldBoxesDto } from '../api/steelService';
import { LoginMgrService } from './login-mgr.service';

@Injectable({
  providedIn: 'root'
})
export class SaveMgrService {
  private unsavedChanges: boolean = false;
  @Output() saveClicked: EventEmitter<void> = new EventEmitter<void>();
  @Output() cancelClicked: EventEmitter<void> = new EventEmitter<void>();
  @Output() clearClicked: EventEmitter<void> = new EventEmitter<void>();

  constructor(private api: Client, private loginMgr: LoginMgrService) { }

  setUnsavedChanges(value: boolean) {
    this.unsavedChanges = value;
  }

  hasUnsavedChanges(): boolean {
    return this.unsavedChanges;
  }

  saveChanges() {
    // Logic to save changes
    this.unsavedChanges = false;
  }

  discardChanges() {
    // Logic to discard changes
    this.unsavedChanges = false;
  }

  saveBtnClicked() {
    this.saveClicked.emit();
  }

  cancelBtnClicked() {
    this.cancelClicked.emit();
  }

  clearBtnClicked() {
    this.clearClicked.emit();
  }

  saveFieldBoxes(info: InsertFieldBoxesDto[]): Promise<void> {
    info.forEach(item => item.token = this.loginMgr.getToken() ?? '');
    return this.api.performActionsOnFieldBoxes(info);
  }

  getAllFieldBoxes(): Promise<FieldBox[]> {
    return this.api.getAllRawFields(this.loginMgr.getToken() ?? '').then(result => {
      return result ?? [];
    }).catch(error => {
      console.error('Failed to fetch field boxes', error);
      return [];
    });
  }
}
