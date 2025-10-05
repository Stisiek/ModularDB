import { Input, Directive, Output, EventEmitter } from "@angular/core";
import { FieldBox } from "../api/steelService";
import { STATE } from "../enums/STATE";
import { StateMgrService } from "../services/state-mgr.service";

@Directive()
export abstract class InputBoxBase {
  STATE = STATE;
  @Input() fieldInfo: FieldBox = new FieldBox();
  @Input() isBeingCreated = false;
  
  @Output() deleteClicked = new EventEmitter<void>();
  @Output() editFinished = new EventEmitter<void>();

  constructor(public stateMgr: StateMgrService) { }
    
  toFieldBox(): FieldBox {
    const copy = Object.assign(new FieldBox(), this.fieldInfo);
    return copy;
  }

  onDelete() {
    this.stateMgr.setEdited(true);
    this.deleteClicked.emit();
  }

  onEdit() {
    this.isBeingCreated = true;
  }
  
  shouldShowEdit() : boolean {
    return this.stateMgr.getState() === STATE.FIELD_EDIT && !this.isBeingCreated;
  }
}
