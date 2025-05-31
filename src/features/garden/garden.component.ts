import { Component, OnInit } from '@angular/core';
import { DeepMap } from '../../util/deepMap';
import { IsometricTilingComponent } from '../../shared/isometric-tiling/isometric-tiling.component';

@Component({
  selector: 'app-garden',
  imports: [IsometricTilingComponent],
  templateUrl: './garden.component.html',
  styleUrl: './garden.component.scss'
})
export class GardenComponent implements OnInit {
  items = new DeepMap<{x:number, y:number}, string>("x", "y")

  public sizeX = 128
  public sizeY = 92

  public backgroundImage = "url('/assets/pictures/fog.png')"

  ngOnInit(): void {
    this.items.set({x:0, y:0}, "t0")
    //this.items.set({x:1, y:0}, "t0")
    this.items.set({x:0, y:1}, "t0")

    // this.items.set({x:0, y:0}, "t0")
    // this.items.set({x:1, y:-1}, "t0")
    // this.items.set({x:2, y:-2}, "t0")
    // this.items.set({x:3, y:-3}, "t0")
    // this.items.set({x:4, y:-4}, "t0")
    // this.items.set({x:5, y:-5}, "t0")
    // this.items.set({x:6, y:-6}, "t0")
    // this.items.set({x:7, y:-7}, "t0")
    // this.items.set({x:8, y:-8}, "t0")

    // this.items.set({x:1, y:1}, "t1")
    // this.items.set({x:1, y:2}, "t2")
    // this.items.set({x:2, y:1}, "t3")
    // this.items.set({x:2, y:2}, "t4")
    // this.items.set({x:3, y:1}, "t5")
    // this.items.set({x:3, y:2}, "t6")

    // this.items.set({x:4, y:1}, "t1")
    // this.items.set({x:4, y:2}, "t2")
    // this.items.set({x:5, y:1}, "t3")
    // this.items.set({x:5, y:2}, "t4")

    
    // this.items.set({x:4, y:4}, "t1")
    // this.items.set({x:4, y:5}, "t2")
    // this.items.set({x:5, y:4}, "t3")
    // this.items.set({x:5, y:5}, "t4")
  }

  onTileClick(tile: {key:{x:number, y:number}, value: string}) {
    console.log(tile)
  }

  onUpdateTiles(center: {x:number, y:number}) {
    console.log("update", center.x, center.y);
  }
}
