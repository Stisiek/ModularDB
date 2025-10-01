import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StateMgrService } from '../../services/state-mgr.service';
import { STATE } from '../../enums/STATE';
import { FieldBox } from '../../api/steelService';
import { InputBoxBase } from '../input-box-base';


@Component({
  selector: 'app-simple-text',
  imports: [FormsModule, NgIf],
  templateUrl: './simple-text.component.html',
  styleUrl: './simple-text.component.css'
})
export class SimpleTextComponent extends InputBoxBase {

  constructor(public stateMgrL: StateMgrService) { 
    super(stateMgrL);
  }

  ngOnInit() {
    this.fieldInfo.isNumber = this.fieldInfo.isNumber ?? false;
    this.fieldInfo.title = this.fieldInfo.title ?? 'Opis pola';
    this.fieldInfo.value = this.fieldInfo.value ?? '';
    this.fieldInfo.type = 'ST';
  }

  onCreate() {
    this.fieldInfo.templateParentId = 0;
    this.fieldInfo.memberId = 0;
    this.fieldInfo.isTemplate = true;
    this.isBeingCreated = false;
    this.editFinished.emit();
  }
}
