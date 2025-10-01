import { Component, ComponentRef, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { BOXES } from '../../enums/BOXES';
import { ImagesBoxComponent } from '../../inputs/images-box/images-box.component';
import { TextAreaComponent } from '../../inputs/text-area/text-area.component';
import { FileBoxComponent } from '../../inputs/file-box/file-box.component';
import { SimpleTextComponent } from '../../inputs/simple-text/simple-text.component';
import { DateBoxComponent } from '../../inputs/date-box/date-box.component';
import { BoxMakerComponent } from '../../statics/box-maker/box-maker.component';
import { timeout } from 'rxjs';
import { StateMgrService } from '../../services/state-mgr.service';
import { STATE } from '../../enums/STATE';
import { ActionType, Client, FieldBox, InsertFieldBoxesDto } from '../../api/steelService';
import { SaveMgrService } from '../../services/save-mgr.service';

@Component({
  selector: 'app-add-field',
  imports: [],
  templateUrl: './add-field.component.html',
  styleUrl: './add-field.component.css',
  encapsulation: ViewEncapsulation.None
})
export class AddFieldComponent {
  addingPosition: number = 1;

  newBox: FieldBox = new FieldBox();

  @ViewChild('fieldBoxContainer', { read: ViewContainerRef }) fieldBoxContainer!: ViewContainerRef;

  private boxMakerRef: ComponentRef<BoxMakerComponent> | null = null;

  private loadedItems: ComponentRef<any>[] = [];
  
  private createdItems: ComponentRef<any>[] = [];
  private updatedItems: ComponentRef<any>[] = [];
  private deletedItems: ComponentRef<any>[] = [];

  constructor(private stateMgr: StateMgrService, private saveMgr: SaveMgrService, private api: Client) { }

  ngAfterViewInit() {
    this.stateMgr.stateChanged.subscribe(() => {
      switch (this.stateMgr.getState()) {
        case STATE.FIELD_EDIT:
          if (this.boxMakerRef !== null) {
            return;
          }
          this.AddPlusBtn();
          break;
        case STATE.FIELD_VIEW:
          if (this.boxMakerRef === null) {
            return;
          }
          this.boxMakerRef?.destroy();
          this.boxMakerRef = null;
          break;
      }
    });

    this.saveMgr.saveClicked.subscribe(() => {
      //dodac okienko czy na pewno itp
      this.saveAll();
    });

    this.saveMgr.clearClicked.subscribe(() => {
      this.clearClicked();
    });
    
    this.saveMgr.getAllFieldBoxes().then(boxes => {
      for (const box of boxes) {
        this.addComponent(box.type as BOXES, box);
      }
    });
  }
  
  addComponent(val: BOXES, existingBox?: FieldBox) {
    let insertColumn = this.insertIntoProperColumn(false);
    if (undefined === insertColumn) return;

    let newItem: ComponentRef<any> | null = null;
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

    if (!newItem) return;

    if (existingBox) {
      newItem.instance.fieldInfo = existingBox;
      this.loadedItems.push(newItem);
    } else {
      this.createdItems.push(newItem);
    }

    newItem.instance.deleteClicked.subscribe(() => {
      if (this.loadedItems.includes(newItem)) {
        this.deletedItems.push(Object.assign(new FieldBox(), newItem));
        this.loadedItems = this.loadedItems.filter(ref => ref !== newItem);
      }

      newItem?.destroy();
      this.createdItems = this.createdItems.filter(ref => ref !== newItem);
      this.addingPosition--;
      this.boxMakerRef?.destroy();
      this.AddPlusBtn();
    });

    newItem.instance.editFinished.subscribe(() => {
      if (this.loadedItems.includes(newItem)) {
        this.boxEditionHandler(newItem);
      }
    });

    if (this.stateMgr.getState() === STATE.FIELD_EDIT) {
      newItem.instance.isBeingCreated = true;
      this.boxMakerRef?.destroy();
      this.AddPlusBtn();
    }
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
        result = this.fieldBoxContainer;
        break;
      case 2:
        result = this.fieldBoxContainer;
        break;
      case 3:
        result = this.fieldBoxContainer;
        break;
      case 0:
        result = this.fieldBoxContainer;
        break;
    }
    if (!skipAdding) {
      this.addingPosition++;
    }
    return result;
  }

  collectAllNewBoxes(): FieldBox[] {
    const result: FieldBox[] = [];
    for (const ref of this.createdItems) {
      const fb = this.tryExtractFieldBox(ref.instance);
      if (fb) result.push(fb);
    }
    return result;
  }

  collectAllUpdatedBoxes(): FieldBox[] {
    const result: FieldBox[] = [];
    for (const ref of this.updatedItems) {
      const fb = this.tryExtractFieldBox(ref.instance);
      if (fb) result.push(fb);
    }
    return result;
  }

  collectAllDeletedBoxes(): FieldBox[] {
    const result: FieldBox[] = [];
    for (const ref of this.deletedItems) {
      const fb = this.tryExtractFieldBox(ref.instance);
      if (fb) result.push(fb);
    }
    return result;
  }

  private tryExtractFieldBox(inst: any): FieldBox | null {
    if (inst && typeof inst.toFieldBox === 'function') {
      return inst.toFieldBox();
    }
    if (inst && 'model' in inst && inst.model instanceof FieldBox) {
      return inst.model as FieldBox;
    }
    if (inst && 'box' in inst && inst.box instanceof FieldBox) {
      return inst.box as FieldBox;
    }
    if (inst && 'value' in inst && inst.value instanceof FieldBox) {
      return inst.value as FieldBox;
    }
    return null;
  }

  saveAll() {
    let boxList: InsertFieldBoxesDto[] = new Array<InsertFieldBoxesDto>();

    const boxesCreateDto = new InsertFieldBoxesDto();
    boxesCreateDto.listOfFieldBoxes = this.collectAllNewBoxes() ?? [];
    boxesCreateDto.actionType = ActionType.Create;

    if (boxesCreateDto.listOfFieldBoxes.length !== 0) {
      boxList.push(boxesCreateDto);
    }
    
    const boxesUpdateDto = new InsertFieldBoxesDto();
    boxesUpdateDto.listOfFieldBoxes = this.collectAllUpdatedBoxes() ?? [];
    boxesUpdateDto.actionType = ActionType.Update;

    if (boxesUpdateDto.listOfFieldBoxes.length !== 0) {
      boxList.push(boxesUpdateDto);
    }

    const boxesDeleteDto = new InsertFieldBoxesDto();
    boxesDeleteDto.listOfFieldBoxes = this.collectAllDeletedBoxes() ?? [];
    boxesDeleteDto.actionType = ActionType.Delete;

    if (boxesDeleteDto.listOfFieldBoxes.length !== 0) {
      boxList.push(boxesDeleteDto);
    }
    
    if (boxList.length === 0) {
      this.stateMgr.setState(STATE.FIELD_VIEW);
      return;
    }
    this.saveMgr.saveFieldBoxes(boxList).then(() => {
      this.stateMgr.setState(STATE.FIELD_VIEW);
    });
  }

  clearClicked() {
    for (const ref of this.createdItems) {
      ref.destroy();

      this.boxMakerRef?.destroy();
      this.AddPlusBtn();
    }
    this.createdItems = [];
  }

  boxEditionHandler(updatedItem: ComponentRef<any> | null) {
    if (updatedItem == null) return;
    this.updatedItems.push(updatedItem);
  }
}
