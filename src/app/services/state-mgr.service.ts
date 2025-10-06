import { EventEmitter, Injectable, Output } from '@angular/core';
import { STATE } from '../enums/STATE';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateMgrService {
  private currentState: STATE = STATE.MAIN_VIEW;
  private menuOpen: boolean = false;
  private edited: boolean = false;

  @Output() stateChanged = new EventEmitter<STATE>();

  constructor(private router: Router) { 
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.updateStateFromRoute();
    });
  }

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

  updateStateFromRoute() {
    switch(this.router.url) {
      case '/':
        this.setState(STATE.IDLE);
        break;

      case '/search':
        this.setState(STATE.MAIN_VIEW);
        break;

      case '/templates':
        this.setState(STATE.TEMPLATE_VIEW);
        break;

      case '/fieldboxes':
        this.setState(STATE.FIELD_VIEW);
        break;

      case '/adminpanel':
        this.setState(STATE.SUPER_USER_PANEL_VIEW);
        break;

      case '/login':
        this.setState(STATE.IDLE);
        break;

      default:
        this.setState(STATE.IDLE);
        break;
    }
  }
}
