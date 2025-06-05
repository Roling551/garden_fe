import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { Tile } from '../../models/tile';
import { HttpClient, HttpParams } from '@angular/common/http';
import { TileDto, toTile } from '../../dto/tile-dto';

@Injectable({
  providedIn: 'root'
})
export class TileService {

  readonly basePath = "http://localhost:8080/garden"

  constructor(public httpClient: HttpClient) {}

  // public getTiles(x: number, y:number, range: number): Observable<Tile[]> {
  //   let tiles: Tile[] = []
  //   console.time('myTimer');
  //   for(let i = -range; i <= range; i++) {
  //     for(let j = -range; j <= range; j++) {
  //       tiles.push(new Tile({x:i+x, y:j+y}, {name:"t0"}))
  //     } 
  //   }
  //   console.timeEnd('myTimer');
  //   return of(tiles)
  // }

  public getTiles(x: number, y:number, range: number): Observable<Tile[]> {
    let params = new HttpParams()
      .set('x', x)
      .set('y', y)
      .set('range', range)
    return this.httpClient.get<TileDto[]>(this.basePath + "/tiles-in-range", {params}).pipe(
      map(tiles=>tiles.map(tile=>toTile(tile)))
    )
  }

  public waterTile(x: number, y:number): Observable<Tile> {
    const body = {
      x,
      y,
      action: "water"
    }
    return this.httpClient.post<TileDto>(this.basePath + "/action", body).pipe(map(tile=>toTile(tile)))
  }
}
