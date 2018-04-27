import * as fs from 'fs';
import { fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';
import { BitStream } from 'bit-buffer';

fromEvent<Buffer>(fs.createReadStream('files/in/bin'), 'data')
  .pipe(
    map(i => new BitStream(i)),
    map(originalBS => {
      const flippedBS = new BitStream(new Buffer(originalBS.buffer.byteLength));
      for (let i = 0; i < originalBS.length; i++) {
        flippedBS.writeBoolean(!originalBS.readBoolean());
      }
      return flippedBS;
    })
  )
  .subscribe(i => {
    const ws = fs.createWriteStream('files/out/bin');
    ws.write(i.buffer);
    ws.end();
  });
