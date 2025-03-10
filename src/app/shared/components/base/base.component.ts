import { Component, DestroyRef, inject, OnDestroy } from '@angular/core';

@Component({
  template: '',
})
export abstract class BaseComponent {
 protected destroyRef = inject(DestroyRef);
}
