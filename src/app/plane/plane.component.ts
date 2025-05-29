import { AfterViewInit, Component, OnInit } from '@angular/core';
import panzoom from 'panzoom';
import { DeepMap } from '../../shared/deepMap';

@Component({
  selector: 'app-plane',
  imports: [],
  templateUrl: './plane.component.html',
  styleUrl: './plane.component.scss'
})
export class PlaneComponent implements OnInit, AfterViewInit {
  
  items = new DeepMap<{x:number, y:number}, string>("x", "y")

  distance = 0.5

  elementWidth = this.getX(1,0)+'px'
  elementHeight = this.getY(1,0)+'px'

  public proportionX = 128
  public proportionY = 92

  ngOnInit(): void {
    this.items.set({x:1, y:1}, "t1")
    this.items.set({x:1, y:2}, "t2")
    this.items.set({x:2, y:1}, "t3")
    this.items.set({x:2, y:2}, "t4")
    this.items.set({x:3, y:1}, "t5")
    this.items.set({x:3, y:2}, "t6")

    this.items.set({x:4, y:1}, "t1")
    this.items.set({x:4, y:2}, "t2")
    this.items.set({x:5, y:1}, "t3")
    this.items.set({x:5, y:2}, "t4")

    
    this.items.set({x:4, y:4}, "t1")
    this.items.set({x:4, y:5}, "t2")
    this.items.set({x:5, y:4}, "t3")
    this.items.set({x:5, y:5}, "t4")
  }

  ngAfterViewInit() {
    const element = document.getElementById('zoom-target');
    console.log(element)
    panzoom(element!, {zoomDoubleClickSpeed: 1});
  }

  public getX(x: number, y:number) {
    return this.proportionX * x - this.proportionX * y
  }

  public getY(x: number, y:number) {
    return this.proportionY * x + this.proportionY * y
  }

  public onItemClick(item: string) {
    console.log(item)
  }
}
