import { Component, ElementRef, AfterViewInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-canvas-table',
  template: `

  <div class="content" style="width: 500px;height:500px;overflow: auto;"><canvas #virtualCanvas></canvas></div>
  

  `,
})
export class CanvasTableComponent implements AfterViewInit {
  @ViewChild('virtualCanvas', { static: true }) canvasRef: ElementRef;
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;

  private cellSize = 100; // Size of each cell in pixels
  private rows = 1000; // Total number of rows
  private cols = 100;  // Total number of columns
  private visibleRows: number; // Number of visible rows
  private visibleCols: number; // Number of visible columns

  ngAfterViewInit(): void {
    this.canvas = this.canvasRef.nativeElement;
    this.ctx = this.canvas.getContext('2d');

    // Initialize canvas size based on cellSize, rows, and columns
    this.canvas.width = this.cols * this.cellSize;
    this.canvas.height = this.rows * this.cellSize;

    this.calculateVisibleCells();
    this.renderCanvas();

    this.canvas.addEventListener('scroll', this.handleScroll.bind(this));
  }

  private calculateVisibleCells(): void {
    // Calculate the number of visible rows and columns
    this.visibleRows = Math.ceil(this.canvas.height / this.cellSize);
    this.visibleCols = Math.ceil(this.canvas.width / this.cellSize);
  }

  private handleScroll(): void {
    // Update visible cells and re-render
    this.calculateVisibleCells();
    this.renderCanvas();
  }

  private renderCanvas(): void {
    // Clear the canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Calculate the starting row and column index based on the scroll position
    const startRow = Math.floor(this.canvas.scrollTop / this.cellSize);
    const startCol = Math.floor(this.canvas.scrollLeft / this.cellSize);

    // Calculate the ending row and column index
    const endRow = Math.min(startRow + this.visibleRows, this.rows);
    const endCol = Math.min(startCol + this.visibleCols, this.cols);

    // Loop through the visible cells and draw content
    for (let row = startRow; row < endRow; row++) {
      for (let col = startCol; col < endCol; col++) {
        // Calculate cell position
        const x = col * this.cellSize;
        const y = row * this.cellSize;

        // Draw cell content
        this.ctx.fillStyle = '#cccccc';
        this.ctx.fillRect(x, y, this.cellSize, this.cellSize);

        // Draw text
        this.ctx.fillStyle = '#000000';
         this.ctx.fillText(` ${row}, ${col}`, x , y);
      }
    }
  }
}
