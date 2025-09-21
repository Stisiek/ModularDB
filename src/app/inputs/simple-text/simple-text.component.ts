import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StateMgrService } from '../../services/state-mgr.service';
import { STATE } from '../../enums/STATE';


@Component({
  selector: 'app-simple-text',
  imports: [FormsModule, NgIf],
  templateUrl: './simple-text.component.html',
  styleUrl: './simple-text.component.css'
})
export class SimpleTextComponent {
  @Input() isBeingCreated = false;
  isNumberValue = false;

  @Input() titleValue: string = 'Nagłówek';
  value: string = '';

  @Output() deleteClicked = new EventEmitter<void>();

  constructor(public stateMgr: StateMgrService) { }

  onDelete() {
    this.deleteClicked.emit();
  }

  onCreate() {
    this.isBeingCreated = false;
  }

  onEdit() {
    this.isBeingCreated = true;
  }

  shouldShowEdit() : boolean {
    return this.stateMgr.getState() === STATE.FIELD_EDIT && !this.isBeingCreated;
  }
}
