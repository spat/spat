import client from '.spat/modules/client';

client.start();

spat.appTag.on('pagechange', (e) => {
  console.log(e);
});

spat.appTag.on('pagechanged', (e) => {
  console.log(e);
});