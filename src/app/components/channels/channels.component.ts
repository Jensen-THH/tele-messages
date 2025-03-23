import { Component, inject } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router, RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BaseComponent } from '../../shared/components/base/base.component';

@Component({
  selector: 'app-channels',
  imports: [RouterLink],
  templateUrl: './channels.component.html',
  styleUrl: './channels.component.scss'
})
export class ChannelsComponent extends BaseComponent {
  apiService = inject(ApiService);
  channels$ : any[]= []
  constructor() {
    super();
    this.apiService.getChannels().pipe(takeUntilDestroyed(this.destroyRef)).subscribe(res => this.channels$ = res.data)
  }
}
