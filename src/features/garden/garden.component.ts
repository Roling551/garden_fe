import { Component, OnInit } from '@angular/core';
import { IsometricTilingComponent } from '../../shared/isometric-tiling/isometric-tiling.component';
import { TileService } from '../../services/tile/tile.service';
import { Tile } from '../../models/tile';

@Component({
  selector: 'app-garden',
  imports: [IsometricTilingComponent],
  templateUrl: './garden.component.html',
  styleUrl: './garden.component.scss'
})
export class GardenComponent implements OnInit {
  items = new Map<string, Tile>()

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
        this.items.set(tile.getKey(), tile)
      }
          console.timeEnd('mapTimer');
    })
    console.log("update", center.x, center.y);
  }
}
