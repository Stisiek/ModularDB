import { NgForOf, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { STATE } from '../../enums/STATE';
import { StateMgrService } from '../../services/state-mgr.service';

@Component({
  selector: 'app-file-box',
  imports: [FormsModule, NgIf, NgForOf],
  templateUrl: './file-box.component.html',
  styleUrl: './file-box.component.css'
})
export class FileBoxComponent {
  @Input() isBeingCreated = false;
  fileNames: string[] = [];

  titleValue = 'Nagłówek pliku';

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

  onFileSelected(value: any) {
    this.fileNames = [];
    for (let item in value.target.files) {
      let val = value.target.files[item];
      if (val.name === undefined) break;
      this.fileNames.push(val.name);
    }
  }

  fileClicked(toRemove: boolean, index: number) {
    if (toRemove) {
      this.fileNames.splice(index, 1);
    } else {
      // to be added - pobieranie pliku
    }
  }
}
