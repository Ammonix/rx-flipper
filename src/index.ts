import { from, fromEvent, bindNodeCallback, of } from 'rxjs';
import { map, mergeMap, switchMap, tap } from 'rxjs/operators';

import * as fs from 'fs';
import { BitStream, BitView } from 'bit-buffer';

const data$ = fromEvent<Buffer>(fs.createReadStream('files/in/bin'), 'data');

const bits$ = data$.pipe(
  map(i => new BitStream(i)),
  mergeMap(bs => {
    const bits = [];
    for (let i = 0; i < bs.length; i++) {
      bits.push(bs.readBoolean());
    }
    return from(bits);
  })
);

const filpped$ = bits$.pipe(map(i => !i));

filpped$.subscribe(console.log);
