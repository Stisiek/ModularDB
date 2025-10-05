import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StateMgrService } from '../../services/state-mgr.service';
import { STATE } from '../../enums/STATE';
import { FieldBox } from '../../api/steelService';
import { InputBoxBase } from '../input-box-base';

@Component({
  selector: 'app-text-area',
  imports: [FormsModule, NgIf],
  templateUrl: './text-area.component.html',
  styleUrl: './text-area.component.css'
})
export class TextAreaComponent extends InputBoxBase {

  constructor(public stateMgrL: StateMgrService) {
    super(stateMgrL);
  }

  ngOnInit() {
    this.fieldInfo.title = this.fieldInfo.title ?? 'Opis pola tekstowego';
    this.fieldInfo.value = this.fieldInfo.value ?? '';
    this.fieldInfo.type = 'TA';
  }
  
  onCreate() {
    this.fieldInfo.templateParentId = 0;
    this.fieldInfo.memberId = 0;
    this.fieldInfo.isTemplate = true;
    this.isBeingCreated = false;

    this.stateMgr.setEdited(true);
    this.editFinished.emit();
  }
}
