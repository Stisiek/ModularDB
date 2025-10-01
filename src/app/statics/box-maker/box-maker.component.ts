import { NgForOf, NgIf } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { BOXES } from '../../enums/BOXES';
import { FormsModule } from '@angular/forms';
import { BoxNamesPipe } from '../../pipes/box-names.pipe';

@Component({
  selector: 'app-box-maker',
  imports: [NgIf, NgForOf, FormsModule, BoxNamesPipe],
  templateUrl: './box-maker.component.html',
  styleUrl: './box-maker.component.css'
})
export class BoxMakerComponent {
  addingEnabled: boolean = false;
  boxes: string[] = Object.values(BOXES);
  chosenBox?: BOXES = undefined;

  @Output() boxAdded = new EventEmitter<BOXES>();

  addBox() {
    this.addingEnabled = true;
  }
  
  nextClicked() {
    this.addingEnabled = false;
    this.boxAdded.emit(this.chosenBox);
  }
}
