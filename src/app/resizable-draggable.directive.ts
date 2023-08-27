import {
  Directive,
  ElementRef,
  Renderer2,
  HostListener,
} from '@angular/core';

@Directive({
  selector: '[appResizableDraggable]',
})
export class ResizableDraggableDirective {
  private isResizing = false;
  private initialX = 0;
  private initialWidth = 0;
  private minWidth = 100; // Minimum width
  private maxWidth = 1000; // Maximum width

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent): void {
    const resizeHandle = this.el.nativeElement.querySelector('.resize-handle');
    if (resizeHandle && resizeHandle.contains(event.target)) {
      // Check if the click was on the resize handle
      event.preventDefault();
      this.isResizing = true;
      this.initialX = event.clientX;
      this.initialWidth = this.el.nativeElement.clientWidth;
    }
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    if (!this.isResizing) return;

    const newWidth = this.initialWidth + (event.clientX - this.initialX);
    this.renderer.setStyle(
      this.el.nativeElement,
      'width',
      `${Math.min(Math.max(this.minWidth, newWidth), this.maxWidth)}px`
    );
  }

  @HostListener('document:mouseup')
  onMouseUp(): void {
    this.isResizing = false;
  }
}
