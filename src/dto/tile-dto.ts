import { Tile } from "../models/tile"

export interface TileDto {
    x: number,
    y: number,
    name: string,
    variant: number
}

export function toTile(dto: TileDto): Tile {
    return new Tile({x:dto.x, y:dto.y}, {name:dto.name})
}