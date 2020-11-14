import client from '.spat/modules/client';

client.start();

spat.appTag.on('pagechange', (e) => {
  console.log('pagechange', e);
});

spat.appTag.on('pagechanged', (e) => {
  console.log('pagechanged', e);
});