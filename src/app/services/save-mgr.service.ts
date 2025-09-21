import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SaveMgrService {
  private unsavedChanges: boolean = false;

  constructor() { }

  setUnsavedChanges(value: boolean) {
    this.unsavedChanges = value;
  }

  hasUnsavedChanges(): boolean {
    return this.unsavedChanges;
  }

  saveChanges() {
    // Logic to save changes
    this.unsavedChanges = false;
  }

  discardChanges() {
    // Logic to discard changes
    this.unsavedChanges = false;
  }
}
