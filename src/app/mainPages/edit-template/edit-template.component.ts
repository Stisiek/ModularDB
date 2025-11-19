import { Component, ComponentRef, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { ActionType, Client, FieldBox, InsertFieldBoxesDto, Template } from '../../api/steelService';
import { FieldMakerBase } from '../field-maker-base';
import { ImagesBoxComponent } from '../../inputs/images-box/images-box.component';
import { TextAreaComponent } from '../../inputs/text-area/text-area.component';
import { FileBoxComponent } from '../../inputs/file-box/file-box.component';
import { SimpleTextComponent } from '../../inputs/simple-text/simple-text.component';
import { DateBoxComponent } from '../../inputs/date-box/date-box.component';
import { BOXES } from '../../enums/BOXES';
import { SaveMgrService } from '../../services/save-mgr.service';
import { BoxAdderComponent } from '../../statics/box-adder/box-adder.component';
import { TemplateService } from '../../services/template.service';
import { StateMgrService } from '../../services/state-mgr.service';
import { STATE } from '../../enums/STATE';
import { LoginMgrService } from '../../services/login-mgr.service';
import { ConfirmationModalService } from '../../services/confirmation-modal.service';

@Component({
  selector: 'app-edit-template',
  imports: [],
  templateUrl: './edit-template.component.html',
  styleUrl: './edit-template.component.css',
  encapsulation: ViewEncapsulation.None
})
export class EditTemplateComponent extends FieldMakerBase {
  templateId: number = 0; // Example template ID
  template: Template = {} as Template;

  @ViewChild('fieldBoxContainerSearch', { read: ViewContainerRef }) fieldBoxContainerSearch!: ViewContainerRef;
  @ViewChild('fieldBoxContainerLeft', { read: ViewContainerRef }) fieldBoxContainerLeft!: ViewContainerRef;
  @ViewChild('fieldBoxContainerMiddle', { read: ViewContainerRef }) fieldBoxContainerMiddle!: ViewContainerRef;
  @ViewChild('fieldBoxContainerRight', { read: ViewContainerRef }) fieldBoxContainerRight!: ViewContainerRef;

  private allRawFields: FieldBox[] = [];
  private allRawFieldsForSearch: FieldBox[] = [];

  private loadedSearchItems: ComponentRef<any>[] = [];
  private loadedItems: ComponentRef<any>[] = [];
  private allPluses: ComponentRef<any>[] = [];
  private permBoxes: ComponentRef<any>[] = [];
  
  private createdItems: ComponentRef<any>[] = [];
  private deletedItems: ComponentRef<any>[] = [];

  constructor(private api: Client, public confirmationModalService: ConfirmationModalService, private saveMgr: SaveMgrService, private templateService: TemplateService, private stateMgr: StateMgrService, private loginMgr: LoginMgrService) { super(); }

  async ngAfterViewInit() {
    this.loadTemplate();
    this.AddPermanentBoxes();
    this.allRawFields = await this.templateService.getFields();
    this.allRawFieldsForSearch = Object.assign([], this.allRawFields);

    this.saveMgr.saveClicked.subscribe(async (templateTitle) => {
      await this.saveAll(templateTitle);
      this.loadTemplate();
    });

    this.saveMgr.cancelClicked.subscribe(async () => {
      // Usun wszystkie dokonane zmiany
      for (let item of this.createdItems) {
        item.destroy();
      }

      for (let item of this.deletedItems) {
        if (item.instance.id > 0) {
          this.addComponent(item.instance.fieldInfo.type as BOXES, item.instance.fieldInfo);
        }
      }

      this.deletedItems = [];
      this.createdItems = [];
    });

    this.saveMgr.clearClicked.subscribe(() => {
      this.loadTemplate();
    });

    this.saveMgr.deleteClicked.subscribe(() => {
      this.handleTemplateDeletion();
    });

    this.stateMgr.stateChanged.subscribe(async (newState) => {
      this.allRawFields = await this.templateService.getFields();
      this.allRawFieldsForSearch = Object.assign([], this.allRawFields);
      if (newState === STATE.TEMPLATE_VIEW) {
        this.RemoveAllPluses();
        this.setEditForAllItems(false);
      } else if (newState === STATE.TEMPLATE_EDIT) {
        this.AddAllPluses();
        this.setEditForAllItems(true);
      }
    });

    this.templateService.templateChanged.subscribe((template) => {
      this.clearAll();
      this.template = template;
      this.populateFieldContainers();
      this.checkForEdit();
    });
  }

  clearAll() {
    this.RemoveAllPluses();
    
    this.clearLoad();

    this.template = {} as Template;

    this.fieldBoxContainerSearch.clear();
    this.fieldBoxContainerLeft.clear();
    this.fieldBoxContainerMiddle.clear();
    this.fieldBoxContainerRight.clear();
    this.createdItems = [];
    this.deletedItems = [];

    this.AddPermanentBoxes();
  }

  clearLoad() {
    for (let item of this.loadedItems) {
      item.destroy();
    }
    for (let item of this.loadedSearchItems) {
      item.destroy();
    }

    this.loadedItems = [];
    this.loadedSearchItems = [];
  }

  setEditForAllItems(setMode: boolean) {
    for (let item of this.loadedItems) {
      item.instance.isTemplateMade = setMode;
    }

    for (let item of this.loadedSearchItems) {
      if (item.instance.fieldInfo.searchPosition == 1 || item.instance.fieldInfo.searchPosition == 2) {
        continue;
      }
      item.instance.isTemplateMade = setMode;
    }

    for (let item of this.createdItems) {
      item.instance.isTemplateMade = setMode;
    }
  }

  loadTemplate() {
    this.api.getWholeTemplate(this.templateId).then(template => {
      this.template = template;
      this.populateFieldContainers();
    });
  }

  populateFieldContainers() {
    this.template.searchItems = this.template.searchItems.sort((a, b) => (a.position ?? 0) - (b.position ?? 0));
    for(var item of this.template.searchItems) {
      this.addComponent(item.type as BOXES, item);
    }

    this.template.items = this.template.items.sort((a, b) => (a.position ?? 0) - (b.position ?? 0));
    for (var item of this.template.items) {
      this.addComponent(item.type as BOXES, item);
    }

    if (this.stateMgr.getState() === STATE.TEMPLATE_EDIT) {
      this.RemoveAllPluses();
      this.AddAllPluses();
    }
  }

  AddAllPluses() {
    this.AddPlusBtn(this.fieldBoxContainerSearch);
    this.AddPlusBtn(this.fieldBoxContainerLeft);
    this.AddPlusBtn(this.fieldBoxContainerMiddle);
    this.AddPlusBtn(this.fieldBoxContainerRight);
  }

  RemoveAllPluses() {
    for (let plus of this.allPluses) {
      plus.destroy();
    }
  }

  AddPermanentBoxes() {
    let newItem: ComponentRef<any> | null = null;
    newItem = this.fieldBoxContainerSearch.createComponent(SimpleTextComponent);

    let permTitleBoxSearch = new FieldBox();
    newItem.instance.fieldInfo = permTitleBoxSearch;
    permTitleBoxSearch.title = "Tytuł wpisu";
    permTitleBoxSearch.type = BOXES.TEXT;
    permTitleBoxSearch.searchPosition = 1;
    permTitleBoxSearch.templateParentId = 0;
    
    this.permBoxes.push(newItem);
    this.loadedSearchItems.push(newItem);

    newItem = this.fieldBoxContainerSearch.createComponent(DateBoxComponent);

    let permDateBoxSearch = new FieldBox();
    newItem.instance.fieldInfo = permDateBoxSearch;
    permDateBoxSearch.title = "Data dodania";
    permDateBoxSearch.type = BOXES.DATE;
    permDateBoxSearch.searchPosition = 2;
    permDateBoxSearch.templateParentId = -1;

    this.permBoxes.push(newItem);
    this.loadedSearchItems.push(newItem);
  }

  RemovePermanentBoxes() {
    for (let permBox of this.permBoxes) {
      permBox.destroy();
    }
  }

  AddPlusBtn(column: ViewContainerRef, isAddingEnabled: boolean = false) {
    if (column) {
      const boxMakerRef = column.createComponent(BoxAdderComponent);
      if (column === this.fieldBoxContainerSearch) {
        for (var item of this.loadedSearchItems) {
          // Filtrowanie search itemow ktore sa juz na templacie
          if (this.allRawFieldsForSearch.find(x => x.id === item.instance.fieldInfo.templateParentId)) {
            this.allRawFieldsForSearch = this.allRawFieldsForSearch.filter(f => f.id !== item.instance.fieldInfo.templateParentId);
          }
        }
        boxMakerRef.instance.fieldBoxes = this.allRawFieldsForSearch;
        boxMakerRef.instance.searchMode = true;
      } else {
        for (var item of this.loadedItems) {
          // Filtrowanie itemow ktore sa juz na templacie
          if (this.allRawFields.find(x => x.id === item.instance.fieldInfo.templateParentId)) {
            this.allRawFields = this.allRawFields.filter(f => f.id !== item.instance.fieldInfo.templateParentId);
          }
        }
        boxMakerRef.instance.fieldBoxes = this.allRawFields;
      }

      if (isAddingEnabled) {
        boxMakerRef.instance.addingEnabled = true;
      }

      boxMakerRef.instance.addClicked.subscribe(() => {
        this.RemoveAllPluses();
        this.AddPlusBtn(column, true);
      });

      boxMakerRef.instance.canceled.subscribe(() => {
        this.RemoveAllPluses();
        this.AddAllPluses();
      });

      boxMakerRef.instance.boxAdded.subscribe((box: FieldBox) => {
        this.RemoveAllPluses();
        this.addComponent(box.type as BOXES, box, column);
        this.stateMgr.setEdited(true);
        if (column === this.fieldBoxContainerSearch) {
          this.allRawFieldsForSearch = this.allRawFieldsForSearch.filter(f => f.id !== box.id);
        } else {
          this.allRawFields = this.allRawFields.filter(f => f.id !== box.id);
        }
        
        this.AddAllPluses();
      });

      this.allPluses.push(boxMakerRef);
    }
  }

  addComponent(val: BOXES, existingBox?: FieldBox, column?: ViewContainerRef) {
    let insertColumn = existingBox?.searchPosition !== undefined && existingBox.searchPosition > 0 ? this.fieldBoxContainerSearch : this.insertIntoProperColumn(existingBox?.position ?? 1);
    if (column) {
      insertColumn = column;
    }
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

    newItem!.instance.fieldInfo = existingBox ? Object.assign(new FieldBox(), existingBox) : new FieldBox();
    if (this.stateMgr.getState() === STATE.TEMPLATE_EDIT) {
      newItem!.instance.isTemplateMade = true;
    }
    newItem!.instance.isEnabled = true;

    newItem!.instance.deleteClicked.subscribe(() => {
      if (this.loadedItems.includes(newItem) || this.loadedSearchItems.includes(newItem)) {
        this.deletedItems.push(Object.assign(new FieldBox(), newItem));
        this.loadedItems = this.loadedItems.filter(ref => ref !== newItem);
        this.loadedSearchItems = this.loadedSearchItems.filter(ref => ref !== newItem);
      }
      newItem?.destroy();
      this.createdItems = this.createdItems.filter(ref => ref !== newItem);

      if (newItem!.instance.fieldInfo.searchPosition !== undefined && newItem!.instance.fieldInfo.searchPosition > 0) {
        this.allRawFieldsForSearch.push(newItem!.instance.fieldInfo);
      } else {
        this.allRawFields.push(newItem!.instance.fieldInfo);
      }
      this.checkForEdit();
    });

    let newNum = 0;
    switch (column) {
      case this.fieldBoxContainerSearch:
        newNum = this.loadedSearchItems.map(item => item.instance.fieldInfo.searchPosition).sort((a, b) => a - b).pop();
        newItem.instance.fieldInfo.searchPosition = newNum + 1;
        break;
      case this.fieldBoxContainerLeft:
        newNum = this.loadedItems.filter(item => item.instance.fieldInfo.position !== undefined && (item.instance.fieldInfo.position % 3) === 1).map(item => item.instance.fieldInfo.position).sort((a, b) => a - b).pop();
        if (newNum === undefined) {
          newNum = -2;
        }
        newItem.instance.fieldInfo.position = newNum + 3;
        break;
      case this.fieldBoxContainerMiddle:
        newNum = this.loadedItems.filter(item => item.instance.fieldInfo.position !== undefined && (item.instance.fieldInfo.position % 3) === 2).map(item => item.instance.fieldInfo.position).sort((a, b) => a - b).pop();
        if (newNum === undefined) {
          newNum = -1;
        }
        newItem.instance.fieldInfo.position = newNum + 3;
        break;
      case this.fieldBoxContainerRight:
        newNum = this.loadedItems.filter(item => item.instance.fieldInfo.position !== undefined && (item.instance.fieldInfo.position % 3) === 0).map(item => item.instance.fieldInfo.position).sort((a, b) => a - b).pop();
        if (newNum === undefined) {
          newNum = 0;
        }
        newItem.instance.fieldInfo.position = newNum + 3;
        break;
    }

    if (column) {
      this.createdItems.push(newItem!);
    }

    if (newItem.instance.fieldInfo.searchPosition !== undefined && newItem.instance.fieldInfo.searchPosition > 0) {
      this.loadedSearchItems.push(newItem);
    } else {
      this.loadedItems.push(newItem);
    }
  }

  insertIntoProperColumn(position: number) {
    let result : ViewContainerRef | undefined;
    
    switch (position % 3) {
      case 1:
        result = this.fieldBoxContainerLeft;
        break;
      case 2:
        result = this.fieldBoxContainerMiddle;
        break;
      case 0:
        result = this.fieldBoxContainerRight;
        break;
    }

    return result;
  }

  checkForEdit() {
    if (this.loadedItems.length == 0 && this.loadedSearchItems.length == 2 && this.createdItems.length == 0) {
      this.stateMgr.setEdited(false);
    } 
  }

  async saveAll(templateTitle: string) {
    if (!this.validateSearchTemplateFields()) {
      await this.confirmationModalService.information(
        'Nie wszystkie pola wyszukiwania są obecne na szablonie.'
      );
      
      return;
    }

    let boxList: InsertFieldBoxesDto[] = new Array<InsertFieldBoxesDto>();
    let templateToSave = Object.assign(new Template(), this.template);
  
    const boxesCreateDto = new InsertFieldBoxesDto();
    boxesCreateDto.listOfFieldBoxes = this.collectAllNewBoxes() ?? [];
    boxesCreateDto.actionType = ActionType.Create;

    let fieldForCheck: FieldBox[] = [];
    await this.templateService.getFields().then(allFields => {
      fieldForCheck = allFields;  
    });

    templateToSave.items = this.loadedItems.map(ref => this.tryExtractFieldBox(ref.instance)).filter(fb => fb !== null) as FieldBox[];

    for (let item of templateToSave.items) {
      if (fieldForCheck.find(field => field.id === item.id)) {
        item.templateParentId = item.id;
        item.id = 0;
      }
    }

    templateToSave.searchItems = this.loadedSearchItems.map(ref => this.tryExtractFieldBox(ref.instance)).filter(fb => fb !== null) as FieldBox[];
    templateToSave.searchItems = templateToSave.searchItems.filter(item => item.searchPosition !== 1 && item.searchPosition !== 2);

    for (let item of templateToSave.searchItems) {
      if (fieldForCheck.find(field => field.id === item.id)) {
        item.templateParentId = item.id;
        item.id = 0;
      }
    }

    templateToSave.name = templateTitle;

    this.api.saveNewTemplate(this.loginMgr.getToken() ?? '', templateToSave).then(() => {
      this.stateMgr.setState(STATE.TEMPLATE_VIEW);
    });
  }

  collectAllNewBoxes(): FieldBox[] {
    const result: FieldBox[] = [];
    for (const ref of this.createdItems) {
      const fb = this.tryExtractFieldBox(ref.instance);
      if (fb) result.push(fb);
    }
    return result;
  }

  collectAllDeletedBoxes() : FieldBox[] {
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

  handleTemplateDeletion() {
    this.api.removeTemplate(this.template.id, this.loginMgr.getToken() ?? '').then(() => {
      this.template = {} as Template;
      this.templateId = 0;
      this.clearAll();
      this.stateMgr.setState(STATE.TEMPLATE_VIEW);
    });
  }

  validateSearchTemplateFields() {
    return this.loadedSearchItems
      .filter(item => item.instance.fieldInfo.searchPosition !== 1 && item.instance.fieldInfo.searchPosition !== 2)
      .every(searchItem => 
        this.loadedItems.some(box => box.instance.fieldInfo.id === searchItem.instance.fieldInfo.id)
      );
  }
}
