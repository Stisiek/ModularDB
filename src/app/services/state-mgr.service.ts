import { EventEmitter, Injectable, Output } from '@angular/core';
import { STATE } from '../enums/STATE';

@Injectable({
  providedIn: 'root'
})
export class StateMgrService {
  private currentState: STATE = STATE.MAIN_VIEW;
  private menuOpen: boolean = false;
  private edited: boolean = false;

  @Output() stateChanged = new EventEmitter<STATE>();

  constructor() { }

  setState(state: STATE) {
    this.currentState = state;
    this.stateChanged.emit(this.currentState);
  }

  getState(): STATE {
    return this.currentState;
  }

  isEdited(): boolean {
    return this.edited;
  }

  setEdited(value: boolean) {
    this.edited = value;
  }

  isEditing(): boolean {
    return [
      STATE.FIELD_EDIT,
      STATE.TEMPLATE_EDIT,
      STATE.RECORD_EDIT,
      STATE.RECORD_CREATE,
      STATE.SUPER_USER_PANEL_EDIT
    ].includes(this.currentState);
  }

  isTemplateEdit(): boolean {
    return this.currentState === STATE.TEMPLATE_EDIT;
  }

  isTemplate() : boolean {
    return this.currentState === STATE.TEMPLATE_VIEW || this.currentState === STATE.TEMPLATE_EDIT;
  }

  menuOpenStatus(): boolean {
    return this.menuOpen;
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
}
