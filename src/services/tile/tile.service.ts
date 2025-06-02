import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Tile } from '../../models/tile';

@Injectable({
  providedIn: 'root'
})
export class TileService {

  constructor() {}

  public getTiles(x: number, y:number, range: number): Observable<Tile[]> {
    let tiles: Tile[] = []
    console.time('myTimer');
    for(let i = -range; i <= range; i++) {
      for(let j = -range; j <= range; j++) {
        tiles.push(new Tile({x:i+x, y:j+y}, {name:"t0"}))
      } 
    }
    console.timeEnd('myTimer');
    return of(tiles)
  }
}
