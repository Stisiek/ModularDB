import { Injectable } from '@angular/core';
import { STATE } from '../enums/STATE';

@Injectable({
  providedIn: 'root'
})
export class StateMgrService {
  private currentState: STATE = STATE.FIELD_EDIT;
  private menuOpen: boolean = false;

  constructor() { }

  setState(state: STATE) {
    this.currentState = state;
  }

  getState(): STATE {
    return this.currentState;
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
    console.log(this.menuOpen);
    this.menuOpen = !this.menuOpen;
  }
}
