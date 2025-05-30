import { signal } from "@angular/core";

export class DeepMap<K, V> {
    fields: string[]
    map = new Map();
    _length = 0
    constructor(...fields:  string[]) {
        this.fields = fields
    }

    public get length(): number {
        return this._length
    }

    public keyValuePairs = signal<{key: K, value: V}[]>([])

    public set(key: any, value: V) {
        let searched = this.map
        for (let i = 0; i < this.fields.length - 1; i++) {
            const field = this.fields[i];
            if(searched.has(key[field])) {
                searched = searched.get(key[field])
            } else {
                const newMap = new Map()
                searched.set(key[field], newMap)
                searched = newMap
            }
        }
        const lastKeyField = key[this.fields[this.fields.length-1]]
        if(!searched.has(lastKeyField)) {
            this._length += 1
        }
        searched.set(lastKeyField, value)
        this._updateKeyValuePairs()
    }

    public get(key: any): V | null {
        let searched = this.map
        for (const field of this.fields) {
            if(searched.has(key[field])) {
                searched = searched.get(key[field])
            } else {
                return null
            }
        }
        return searched as V
    }

    _updateKeyValuePairs() {
        let outputArray: { key: K; value: V; }[] = []
        this._iterateNested(this.map, {}, this.fields, outputArray)
        this.keyValuePairs.set(outputArray)
    }

    _iterateNested(map: Map<any, any>, key: any, fields: string[], outputArray: {key:K, value:V}[]) {
        if(fields.length > 1) {
            for(const [k, v] of map.entries()) {
                const field = fields[0]
                key[field] = k
                this._iterateNested(v as Map<any, any>, {...key}, fields.slice(1), outputArray)
            }
        } else {
            for(const [k, v] of map.entries()) {
                const field = fields[0]
                key[field] = k
                outputArray.push({key:{...key}, value: v})
            }
        }
    }
}