import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, HostListener, Input, input, OnInit, output, signal, TemplateRef } from '@angular/core';
import panzoom, { PanZoom, Transform } from 'panzoom';

@Component({
  selector: 'app-isometric-tiling',
  imports: [CommonModule],
  templateUrl: './isometric-tiling.component.html',
  styleUrl: './isometric-tiling.component.scss'
})
export class IsometricTilingComponent<T> implements OnInit, AfterViewInit {
  tilesData = input<{key:{x:number, y:number}, value:T}[]>();
  @Input() minZoom = 0.5;
  @Input() maxZoom = 6;

  @Input() backgroundImage?: string;

  @Input({required: true}) sizeX!:number;
  @Input({required: true}) sizeY!:number;

  @Input({required: true}) tileTemplate!:TemplateRef<any>;

  tileClick = output<{key:{x:number, y:number}, value:T}>();

  public positionRectX = 0
  public positionRectY = 0

  public positionX = 0
  public positionY = 0

  public tileOnScreenX = 0
  public tileOnScreenY = 0

  currentTransform: Transform = {x:0, y:0, scale:1}
  panStartTransform: Transform | null = null

  @Input() allowedPixelsMovedForClick = 5;

  ngOnInit(): void {
    this.calculateTilesOnScreen()
  }

  ngAfterViewInit() {
    const element = document.getElementById('zoom-target');
    const instance = panzoom(element!, {zoomDoubleClickSpeed: 1, minZoom: this.minZoom, maxZoom: this.maxZoom});

    const component = this
    instance.on('transform', function(e: any) {
      const transform = e.getTransform()
      component.currentTransform = transform
      component.positionRectX = Math.floor(transform.x/component.sizeX/transform.scale)
      component.positionRectY = Math.floor(transform.y/component.sizeY/transform.scale)
      component.positionX = Math.floor((-transform.x/component.sizeX - transform.y/component.sizeY)/transform.scale)
      component.positionY = Math.floor((transform.x/component.sizeX - transform.y/component.sizeY)/transform.scale + 0.5)
      component.calculateTilesOnScreen()
      console.log(component.tileOnScreenX)
      console.log(component.tileOnScreenY)
    });

    instance.on('panstart', function(e: any) {
      component.panStartTransform = {...e.getTransform()} as Transform
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: UIEvent) {
    this.calculateTilesOnScreen()
  }

  private calculateTilesOnScreen() {
    this.tileOnScreenX = Math.ceil(window.innerWidth / this.sizeX / this.currentTransform.scale);
    this.tileOnScreenY = Math.ceil(window.innerHeight / this.sizeY / this.currentTransform.scale);
  }

  public getTransformX(x: number, y:number) {
    return (this.sizeX * (x - y)) / 2
  }
  public getTransformY(x: number, y:number) {
    return (this.sizeY * (x + y)) / 2
  }

  public onTileClick(tileData:{key:{x:number, y:number}, value:T}) {
    if(
      !this.panStartTransform || 
      this.getOnScreenTransformDistance(this.panStartTransform, this.currentTransform) < this.allowedPixelsMovedForClick
    ) {
      this.tileClick.emit(tileData)
    }
    this.panStartTransform = null
  }

  private getOnScreenTransformDistance(t1: Transform, t2: Transform): number {
    return Math.sqrt((t1.x - t2.x) ** 2 + (t1.y - t2.y) ** 2)
  }

  get backgroundTransform(): string {
     return `translate(${(-this.positionRectX-1) *this.sizeX}px, ${(-this.positionRectY-1) *this.sizeY}px)`;
  }

  getRange(n: number): ArrayIterator<number> {
    return Array(n).keys()
  }
}
