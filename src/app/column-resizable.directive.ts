import { Directive, ElementRef, Renderer2, HostListener, EventEmitter, Output } from '@angular/core';

@Directive({
  selector: '[appColumnResizable]',
})
export class ColumnResizableDirective {
  private isResizing = false;
  private initialX = 0;
  private initialWidth = 0;

  @Output() columnWidthChange = new EventEmitter<number>();

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent): void {
    const resizeHandle = this.el.nativeElement;
    if (resizeHandle && event.target === resizeHandle) {
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
    this.renderer.setStyle(this.el.nativeElement, 'min-width', `${newWidth}px`);
  }

  @HostListener('mouseup')
  onMouseUp(): void {
    this.isResizing = false;
    this.columnWidthChange.emit(this.el.nativeElement.clientWidth)
  }
}
