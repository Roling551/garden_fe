import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, Input, input, output, signal, TemplateRef } from '@angular/core';
import panzoom, { PanZoom, Transform } from 'panzoom';

@Component({
  selector: 'app-isometric-tiling',
  imports: [CommonModule],
  templateUrl: './isometric-tiling.component.html',
  styleUrl: './isometric-tiling.component.scss'
})
export class IsometricTilingComponent<T> implements AfterViewInit {
  tilesData = input<{key:{x:number, y:number}, value:T}[]>();
  @Input() minZoom = 0.2;
  @Input() maxZoom = 6;

  @Input() backgroundImage?: string;

  @Input({required: true}) sizeX!:number;
  @Input({required: true}) sizeY!:number;

  @Input({required: true}) tileTemplate!:TemplateRef<any>;

  tileClick = output<{key:{x:number, y:number}, value:T}>();

  transform = signal<Transform>({x:0, y:0, scale:1})

  public positionX = 0
  public positionY = 0

  ngAfterViewInit() {
    const element = document.getElementById('zoom-target');
    const instance = panzoom(element!, {zoomDoubleClickSpeed: 1, minZoom: this.minZoom, maxZoom: this.maxZoom});

    const component = this
    instance.on('transform', function(e: any) {
      const transform = e.getTransform()
      component.transform.set(e.getTransform())
      component.positionX = Math.floor(transform.x/component.sizeX/transform.scale)
      component.positionY = Math.floor(transform.y/component.sizeY/transform.scale)
    });
  }

  public getX(x: number, y:number) {
    return (this.sizeX * x - this.sizeX * y) / 2
  }

  public getY(x: number, y:number) {
    return (this.sizeY * x + this.sizeY * y) / 2
  }

  public onTileClick(tileData:{key:{x:number, y:number}, value:T}) {
    this.tileClick.emit(tileData)
  }

  get backgroundTransform(): string {
    const { x, y, scale } = this.transform();
     return `translate(${(-this.positionX-1) *this.sizeX}px, ${(-this.positionY-1) *this.sizeY}px)`;
  }
}
