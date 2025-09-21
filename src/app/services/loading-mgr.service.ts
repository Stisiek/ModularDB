import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingMgrService {

  loadingProgress: number = 0;
  color: string = 'yellow';

  constructor() { }

  getLoadingProgress(): number {
    return this.loadingProgress;
  }

  setLoadingProgress(value: number): void {
    this.loadingProgress = value;
  }

  getColor() : string {
    return this.color;
  }

  startLoading(): void {
    this.loadingProgress = 30;
  }

  dataLoaded(): void {
    this.loadingProgress = 70;
  }

  finalizeLoading(): void {
    this.loadingProgress = 100;
    setTimeout(() => {
      this.color = 'transparent';
    }, 300);
    setTimeout(() => {
      this.loadingProgress = 0;
    }, 600);
    setTimeout(() => {
      this.color = 'yellow';
    }, 900);
  }

  cancelLoading(): void {
    this.loadingProgress = 0;
  }
}
