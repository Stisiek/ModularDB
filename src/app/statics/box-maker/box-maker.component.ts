import { NgForOf, NgIf } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { BOXES } from '../../enums/BOXES';
import { FormsModule } from '@angular/forms';
import { Client } from '../../api/steelService';

@Component({
  selector: 'app-box-maker',
  imports: [NgIf, NgForOf, FormsModule],
  templateUrl: './box-maker.component.html',
  styleUrl: './box-maker.component.css'
})
export class BoxMakerComponent {
  addingEnabled: boolean = false;
  boxes: string[] = Object.values(BOXES);
  chosenBox?: BOXES = undefined;

  @Output() boxAdded = new EventEmitter<BOXES>();

  constructor(public steelService: Client) { }

  addBox() {
    this.steelService.logIn("", "").then(result => {
      console.log(result);
    });
    this.addingEnabled = true;
  }
  
  nextClicked() {
    this.addingEnabled = false;
    this.boxAdded.emit(this.chosenBox);
  }
}
