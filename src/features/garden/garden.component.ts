import { Component, OnInit } from '@angular/core';
import { DeepMap } from '../../util/deepMap';
import { IsometricTilingComponent } from '../../shared/isometric-tiling/isometric-tiling.component';
import { TileService } from '../../services/tile/tile.service';

@Component({
  selector: 'app-garden',
  imports: [IsometricTilingComponent],
  templateUrl: './garden.component.html',
  styleUrl: './garden.component.scss'
})
export class GardenComponent implements OnInit {
  items = new DeepMap<{x:number, y:number}, {name: string}>("x", "y")

  public sizeX = 128
  public sizeY = 92

  readonly range = 20

  public backgroundImage = "url('/assets/pictures/fog.png')"

  constructor(public tileService: TileService) {
  }

  ngOnInit(): void {
  }

  onTileClick(tile: {key:{x:number, y:number}, value: {name: string}}) {
    console.log(tile)
  }

  onUpdateTiles(center: {x:number, y:number}) {
    this.tileService.getTiles(center.x, center.y, this.range).subscribe(tiles=>{
          console.time('mapTimer');
      for(const tile of tiles) {
        this.items.set(tile)
      }
          console.timeEnd('mapTimer');
    })
    console.log("update", center.x, center.y);
  }
}
