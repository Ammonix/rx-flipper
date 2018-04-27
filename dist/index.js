"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bit_buffer_1 = require("bit-buffer");
// const data$ = fromEvent<Buffer>(
//   fs.createReadStream('files/in/bin'),
//   'data'
// ).pipe(tap(console.log));
// data$
//   .pipe(
//     // map(i => new BitStream(i)),
//     map(i => new BitStreamCollection(i)),
//     map(bs => {
//       return bs.map()
//       // return new Array(bs.length).map(_ => bs.readBoolean());
//       // const bits = [];
//       // for (let i = 0; i < bs.length; i++) {
//       //   bits.push(bs.readBoolean());
//       // }
//       // return bits;
//     })
//   )
//   .subscribe(console.log);
class BitStreamCollection extends bit_buffer_1.BitStream {
    [Symbol.iterator]() {
        return {
            next: _ => {
                let value = undefined;
                const done = this.bitsLeft === 0;
                if (!done) {
                    value = this.readBoolean();
                }
                return { done, value };
            }
        };
    }
}
for (let i of new BitStreamCollection(new ArrayBuffer(1))) {
    console.log('for of', i);
}
console.log('[0]', new BitStreamCollection(new ArrayBuffer(1))[0]);
