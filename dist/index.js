"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const bit_buffer_1 = require("bit-buffer");
rxjs_1.fromEvent(fs.createReadStream('files/in/bin'), 'data')
    .pipe(operators_1.map(i => new bit_buffer_1.BitStream(i)), operators_1.map(originalBS => {
    const flippedBS = new bit_buffer_1.BitStream(new Buffer(originalBS.buffer.byteLength));
    for (let i = 0; i < originalBS.length; i++) {
        flippedBS.writeBoolean(!originalBS.readBoolean());
    }
    return flippedBS;
}))
    .subscribe(i => {
    const ws = fs.createWriteStream('files/out/bin');
    ws.write(i.buffer);
    ws.end();
});
