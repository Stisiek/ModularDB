import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { STATE } from '../../enums/STATE';
import { StateMgrService } from '../../services/state-mgr.service';
import { FieldBox } from '../../api/steelService';
import { InputBoxBase } from '../input-box-base';

@Component({
  selector: 'app-date-box',
  imports: [NgIf, FormsModule],
  templateUrl: './date-box.component.html',
  styleUrl: './date-box.component.css'
})
export class DateBoxComponent extends InputBoxBase {
  isFromTo: boolean = false;

  dateFromValue = new Date(2021, 10, 10);
  dateToValue = new Date(2021, 10, 25);

  constructor(public stateMgrL: StateMgrService) {
    super(stateMgrL);
  }

  ngOnInit() {
    this.fieldInfo.title = this.fieldInfo.title ?? 'Opis daty';
    this.isFromTo = !this.fieldInfo.isSingleDate;
    this.fieldInfo.type = 'DB';
  }

  onCreate() {
    this.fieldInfo.templateParentId = 0;
    this.fieldInfo.memberId = 0;
    this.fieldInfo.isTemplate = true;
    this.fieldInfo.isSingleDate = !this.isFromTo;
    this.isBeingCreated = false;

    this.stateMgr.setEdited(true);
    this.editFinished.emit();
  }
}
