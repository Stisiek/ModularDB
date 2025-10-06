import { Injectable, ComponentRef, ViewContainerRef, ApplicationRef, createComponent, EnvironmentInjector } from '@angular/core';
import { ConfirmationModalComponent } from '../statics/confirmation-modal/confirmation-modal.component';

@Injectable({
  providedIn: 'root'
})
export class ConfirmationModalService {
  constructor(
    private appRef: ApplicationRef,
    private injector: EnvironmentInjector
  ) {}

  async confirm(message: string): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      const componentRef = createComponent(ConfirmationModalComponent, {
        environmentInjector: this.injector
      });

      componentRef.instance.message = message;
      componentRef.instance.confirmed.subscribe((result: boolean) => {
        this.appRef.detachView(componentRef.hostView);
        componentRef.destroy();
        resolve(result);
      });

      this.appRef.attachView(componentRef.hostView);
      document.body.appendChild(componentRef.location.nativeElement);
    });
  }
}