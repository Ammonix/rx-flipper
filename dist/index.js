"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const fs = require("fs");
const bit_buffer_1 = require("bit-buffer");
const data$ = rxjs_1.fromEvent(fs.createReadStream('files/in/bin'), 'data').pipe(operators_1.tap(console.log));
const bits$ = data$.pipe(operators_1.map(i => new bit_buffer_1.BitStream(i)), operators_1.mergeMap(bs => {
    const bits = [];
    for (let i = 0; i < bs.length; i++) {
        bits.push(bs.readBoolean());
    }
    return rxjs_1.from(bits);
}));
const filpped$ = bits$.pipe(operators_1.map(i => !i));
filpped$.subscribe(console.log);
