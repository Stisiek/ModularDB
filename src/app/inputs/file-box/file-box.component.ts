import { NgForOf, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

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
