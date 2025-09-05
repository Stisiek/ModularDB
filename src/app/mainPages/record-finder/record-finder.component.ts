import { Component, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { ImagesBoxComponent } from '../../inputs/images-box/images-box.component';
import { TextAreaComponent } from '../../inputs/text-area/text-area.component';
import { FileBoxComponent } from '../../inputs/file-box/file-box.component';
import { SimpleTextComponent } from '../../inputs/simple-text/simple-text.component';
import { DateBoxComponent } from '../../inputs/date-box/date-box.component';
import { BOXES } from '../../enums/BOXES';

@Component({
  selector: 'app-record-finder',
  imports: [],
  templateUrl: './record-finder.component.html',
  styleUrl: './record-finder.component.css'
})
export class RecordFinderComponent {
  @Input() templateId!: number;

  @ViewChild('searchBar', { read: ViewContainerRef }) searchBar!: ViewContainerRef;
  @ViewChild('containerLeft', { read: ViewContainerRef }) containerLeft!: ViewContainerRef;
  @ViewChild('containerMiddle', { read: ViewContainerRef }) containerMiddle!: ViewContainerRef;
  @ViewChild('containerRight', { read: ViewContainerRef }) containerRight!: ViewContainerRef;

  
}