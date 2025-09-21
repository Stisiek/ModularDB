import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StateMgrService } from '../../services/state-mgr.service';
import { STATE } from '../../enums/STATE';
import { FieldBox } from '../../api/steelService';

@Component({
  selector: 'app-text-area',
  imports: [FormsModule, NgIf],
  templateUrl: './text-area.component.html',
  styleUrl: './text-area.component.css'
})
export class TextAreaComponent {
  STATE = STATE;
  @Input() isBeingCreated = false;
  @Input() fieldInfo: FieldBox = new FieldBox();  

  @Output() deleteClicked = new EventEmitter<void>();
  
  constructor(public stateMgr: StateMgrService) { }

  ngOnInit() {
    this.fieldInfo.title = this.fieldInfo.title ?? 'Opis pola tekstowego';
    this.fieldInfo.value = this.fieldInfo.value ?? '';
    this.fieldInfo.type = 'TA';
  }

  onDelete() {
    this.deleteClicked.emit();
  }

  onCreate() {
    this.fieldInfo.isTemplate = true;
    this.isBeingCreated = false;
  }

  onEdit() {
    this.isBeingCreated = true;
  }

  shouldShowEdit() : boolean {
    return this.stateMgr.getState() === STATE.FIELD_EDIT && !this.isBeingCreated;
  }
}
