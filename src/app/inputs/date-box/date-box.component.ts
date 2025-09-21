import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { STATE } from '../../enums/STATE';
import { StateMgrService } from '../../services/state-mgr.service';
import { FieldBox } from '../../api/steelService';

@Component({
  selector: 'app-date-box',
  imports: [NgIf, FormsModule],
  templateUrl: './date-box.component.html',
  styleUrl: './date-box.component.css'
})
export class DateBoxComponent {
  STATE = STATE;
  @Input() isBeingCreated: boolean = false;
  isFromTo: boolean = false;

  dateFromValue = new Date(2021, 10, 10);
  dateToValue = new Date(2021, 10, 25);

  @Output() deleteClicked = new EventEmitter<void>();

  @Input() fieldInfo: FieldBox = new FieldBox();
  
  constructor(public stateMgr: StateMgrService) { }

  ngOnInit() {
    this.fieldInfo.title = this.fieldInfo.title ?? 'Opis daty';
    this.isFromTo = !this.fieldInfo.isSingleDate;
    this.fieldInfo.type = 'DB';
  }

  onDelete() {
    this.deleteClicked.emit();
  }

  onCreate() {
    this.fieldInfo.isTemplate = true;
    this.fieldInfo.isSingleDate = !this.isFromTo;
    this.isBeingCreated = false;
  }

  onEdit() {
    this.isBeingCreated = true;
  }

  shouldShowEdit() : boolean {
    return this.stateMgr.getState() === STATE.FIELD_EDIT && !this.isBeingCreated;
  }
}
