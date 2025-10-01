import { NgForOf, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { STATE } from '../../enums/STATE';
import { StateMgrService } from '../../services/state-mgr.service';
import { FieldBox } from '../../api/steelService';
import { InputBoxBase } from '../input-box-base';

@Component({
  selector: 'app-file-box',
  imports: [FormsModule, NgIf, NgForOf],
  templateUrl: './file-box.component.html',
  styleUrl: './file-box.component.css'
})
export class FileBoxComponent extends InputBoxBase {
  fileNames: string[] = [];

  constructor(public stateMgrL: StateMgrService) {
    super(stateMgrL);
  }

  ngOnInit() {
    this.fieldInfo.title = this.fieldInfo.title ?? 'Opis pliku';
    this.fieldInfo.type = 'FB';

    this.fileNames = this.fieldInfo.value?.split('|') ?? [];
    this.fieldInfo.fileCount = this.fileNames.length;
  }

  onCreate() {
    this.fieldInfo.templateParentId = 0;
    this.fieldInfo.memberId = 0;
    this.fieldInfo.isTemplate = true;
    this.fieldInfo.value = this.fileNames.join('|');
    this.fieldInfo.fileCount = this.fileNames.length;
    this.isBeingCreated = false;

    this.editFinished.emit();
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
