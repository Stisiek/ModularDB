import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { STATE } from '../../enums/STATE';
import { StateMgrService } from '../../services/state-mgr.service';

@Component({
  selector: 'app-date-box',
  imports: [NgIf, FormsModule],
  templateUrl: './date-box.component.html',
  styleUrl: './date-box.component.css'
})
export class DateBoxComponent {
  isBeingCreated: boolean = false;
  titleValue: string = 'Opis daty';
  @Input() isFromTo: boolean = false;

  dateFromValue = new Date(2021, 10, 10);
  dateToValue = new Date(2021, 10, 25);

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
