import { BehaviorSubject, filter, Observable, Subject } from 'rxjs';
import { Notification } from './../shared/interfaces/interfaces';
import { effect, Injectable, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  notifications = signal<Notification[]>([]);
  notification = this.notifications.asReadonly();
  nofificationSubject = new Subject<Notification>();
  counterId = 0;
  constructor() {
    const nofificationSubjectRxjs = toSignal(this.nofificationSubject)

    effect(() => {
      const newNotification = nofificationSubjectRxjs();
      if (newNotification) {
        this.notifications.update((current) => [...current, newNotification])
        if (newNotification.duration && newNotification.duration > 0) {
          setTimeout(() => {
            this.removeNotification(newNotification.id)
          }, newNotification.duration);
        }
      }
    })
  }

  removeNotification(id: number) {
    this.notifications.update((current) => current.filter((n) => n.id != id))
  }

  addNotificaton(type: Notification['type'], messages: string, duration: number) {
    const newNotification: Notification = {
      id: this.counterId++,
      messages: messages,
      duration: duration,
      type: type
    }
    this.nofificationSubject.next(newNotification)
  }
}
