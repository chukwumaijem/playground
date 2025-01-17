const Hypercore = require('hypercore');

async function main() {
  const core = new Hypercore('./data/logs'); // store data in ./directory

  // simple call append with a new block of data
  await core.append(Buffer.from('I am a block of data'));
  // pass an array to append multiple blocks as a batch
  await core.append([
    Buffer.from('batch block 1'),
    Buffer.from('batch block 2'),
  ]);

  // get block #42
  const block = await core.get(0);
  console.log('==block==', block.toString());
  // get block #43, but only wait 5s
  const blockIfFast = await core.get(1, { timeout: 5000 });
  console.log('==blockIfFast==', blockIfFast.toString());
  // get block #44, but only if we have it locally
  const blockLocal = await core.get(2, { wait: false });
  console.log('==blockLocal==', blockLocal.toString());
  // get block #44, but only if we have it locally
  const blockUTF = await core.get(2, { valueEncoding: 'utf-8' });
  console.log('==blockUTF==', blockUTF);

  console.log('==core.length==', core.length);
  console.log('==core.contiguousLength==', core.contiguousLength);
  console.log('==core.has==', await core.has(35));

  await core.purge(); // clear the data
}

main();
