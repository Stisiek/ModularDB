import { Component, ComponentRef, ViewChild, ViewContainerRef } from '@angular/core';
import { BOXES } from '../../enums/BOXES';
import { ImagesBoxComponent } from '../../inputs/images-box/images-box.component';
import { TextAreaComponent } from '../../inputs/text-area/text-area.component';
import { FileBoxComponent } from '../../inputs/file-box/file-box.component';
import { SimpleTextComponent } from '../../inputs/simple-text/simple-text.component';
import { DateBoxComponent } from '../../inputs/date-box/date-box.component';
import { BoxMakerComponent } from '../../statics/box-maker/box-maker.component';
import { timeout } from 'rxjs';

@Component({
  selector: 'app-add-field',
  imports: [],
  templateUrl: './add-field.component.html',
  styleUrl: './add-field.component.css'
})
export class AddFieldComponent {
  addingPosition: number = 1;

  @ViewChild('searchBar', { read: ViewContainerRef }) searchBar!: ViewContainerRef;
  @ViewChild('containerLeft', { read: ViewContainerRef }) containerLeft!: ViewContainerRef;
  @ViewChild('containerMiddle', { read: ViewContainerRef }) containerMiddle!: ViewContainerRef;
  @ViewChild('containerRight', { read: ViewContainerRef }) containerRight!: ViewContainerRef;

  private boxMakerRef: ComponentRef<BoxMakerComponent> | null = null;

  ngAfterViewInit() {
    this.boxMakerRef = this.searchBar.createComponent(BoxMakerComponent);

    this.boxMakerRef.instance.boxAdded.subscribe((val: BOXES) => {
      this.addComponent(val);
    });
  }
  
  addComponent(val: BOXES) {
    let insertColumn = this.insertIntoProperColumn(false);
    if (undefined === insertColumn) return;

    let newItem = null;
    switch (val) {
      case BOXES.IMAGES:
        newItem = insertColumn.createComponent(ImagesBoxComponent);
        break;
      case BOXES.TEXT_AREA:
        newItem = insertColumn.createComponent(TextAreaComponent);
        break;
      case BOXES.FILE:
        newItem = insertColumn.createComponent(FileBoxComponent);
        break;
      case BOXES.TEXT:
        newItem = insertColumn.createComponent(SimpleTextComponent);
        break;
      case BOXES.DATE:
        newItem = insertColumn.createComponent(DateBoxComponent);
        break;
    }

    newItem.instance.isBeingCreated = true;

    this.boxMakerRef?.destroy();
    this.AddPlusBtn();
  }

  AddPlusBtn() {
    let whereToAddPlusBtn = this.insertIntoProperColumn(true);
    if (whereToAddPlusBtn) {
      this.boxMakerRef = whereToAddPlusBtn.createComponent(BoxMakerComponent);
      this.boxMakerRef.instance.boxAdded.subscribe((val: BOXES) => {
        this.addComponent(val);
      });
    }
  }

  insertIntoProperColumn(skipAdding: boolean) {
    let result = undefined;
    switch (this.addingPosition % 4) {
      case 1:
        result = this.searchBar;
        break;
      case 2:
        result = this.containerLeft;
        break;
      case 3:
        result = this.containerMiddle;
        break;
      case 0:
        result = this.containerRight;
        break;
    }
    if (!skipAdding) {
      this.addingPosition++;
    }
    return result;
  }
}
