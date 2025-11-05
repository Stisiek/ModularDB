import { NgForOf, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FieldBox } from '../../api/steelService';

@Component({
  selector: 'app-box-adder',
  imports: [FormsModule, NgIf, NgForOf],
  templateUrl: './box-adder.component.html',
  styleUrl: './box-adder.component.css'
})
export class BoxAdderComponent {
  chosenField?: FieldBox;
  @Input() addingEnabled: boolean = false;

  @Output() boxAdded = new EventEmitter<FieldBox>();
  @Output() addClicked = new EventEmitter<void>();
  @Output() canceled = new EventEmitter<void>();

  @Input() fieldBoxes: FieldBox[] = [];
  @Input() searchMode: boolean = false;

  ngAfterViewInit() {
    if (this.fieldBoxes.length > 0 && this.searchMode) {
      this.fieldBoxes = this.fieldBoxes.filter(f => ['ST', 'DB', 'TA'].findIndex(t => t === f.type) >= 0);
    }
  }
  
  addBox() {
    this.addingEnabled = true;
    this.addClicked.emit();
  }

  nextClicked() {
    this.addingEnabled = false;
    this.boxAdded.emit(this.chosenField);
  }

  cancelClicked() {
    this.canceled.emit();
  }
}
