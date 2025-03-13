import { ApplicationRef, ComponentRef, createComponent, inject, Injectable } from '@angular/core';
import { ConfirmDialogData } from '../shared/interfaces/interfaces';
import { Subject } from 'rxjs';
import { DialogComponent } from '../shared/components/dialog/dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  private appRef = inject(ApplicationRef);

  open(data: ConfirmDialogData): Subject<boolean> {
    const result = new Subject<boolean>();
    const componentRef: ComponentRef<DialogComponent> = createComponent(DialogComponent, { environmentInjector: this.appRef.injector });
    componentRef.instance.data = data;

    document.body.appendChild(componentRef.location.nativeElement);
    componentRef.instance.confirmed.subscribe((confirmed: boolean) => {
      result.next(confirmed);
      result.complete();
      componentRef.destroy();
      document.body.removeChild(componentRef.location.nativeElement);
    });
    
    this.appRef.attachView(componentRef.hostView);
    return result;
  }

}
