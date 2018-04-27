import { from, fromEvent, bindNodeCallback } from 'rxjs';
import { map, mergeMap, switchMap, tap } from 'rxjs/operators';

import * as fs from 'fs';

// const bit$ = from([0, 0, 0, 1]);

// bit$.pipe(map(i => !i)).subscribe(console.log);

// const rs = fs.createReadStream('files/in/bin');

// const data$ = fromEvent(rs, 'data').pipe(map((i: Buffer) => i.length));

// data$.subscribe(console.log);

// fs.open('files/in/bin', 'r', (error, fd) => {
//   if (error) {
//     console.error(error.message);
//     return;
//   }
//   var buffer = new Buffer(100);
//   fs.read(fd, buffer, 0, 100, 0, (err, num) => {
//     console.dir(buffer.toString('utf8', 0, num));
//   });
// });

const data$ = fromEvent<Buffer>(
  fs.createReadStream('files/in/bin'),
  'data'
).pipe(tap(console.log));

const bits$ = data$.pipe(map(i => i.readInt8(0)));

bits$.subscribe(console.log);
