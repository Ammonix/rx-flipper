import { from, fromEvent, bindNodeCallback, of } from 'rxjs';
import { map, mergeMap, switchMap, tap } from 'rxjs/operators';

import * as fs from 'fs';
import { BitStream, BitView } from 'bit-buffer';

const data$ = fromEvent<Buffer>(fs.createReadStream('files/in/bin'), 'data');

const bits$ = data$.pipe(
  map(i => new BitStream(i)),
  map(bs => {
    const bits = [];
    for (let i = 0; i < bs.length; i++) {
      bits.push(bs.readBoolean());
    }
    return bits;
  })
);

const filpped$ = bits$.pipe(map(i => i.map(b => !b)));

filpped$.subscribe(i => {
  const bs = new BitStream(new ArrayBuffer(i.length / 8));
  i.forEach(i => bs.writeBoolean(i));
  const ws = fs.createWriteStream('files/out/bin');
  ws.write(bs.buffer);
  ws.end();
});
