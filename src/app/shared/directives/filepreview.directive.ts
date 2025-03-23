import { Directive, Input, ElementRef, OnInit, OnDestroy } from '@angular/core';

@Directive({
  selector: '[appFilePreview]'
})
export class FilePreviewDirective implements OnInit, OnDestroy {
  @Input('appFilePreview') file: File | null = null;
  private url: string | null = null;

  constructor(private el: ElementRef<HTMLImageElement>) {}

  ngOnInit() {
    if (this.file && this.file.type.startsWith('image/')) {
      this.url = URL.createObjectURL(this.file);
      this.el.nativeElement.src = this.url;
    }
  }

  ngOnDestroy() {
    if (this.url) {
      URL.revokeObjectURL(this.url);
    }
  }
}