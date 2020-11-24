import client from '.spat/modules/client';


var indicator = null;
spat.appTag.on('pagechange', (e) => {
  console.log('pagechange', e);
  indicator = spat.modal.indicator();
});

spat.appTag.on('pagechanged', (e) => {
  console.log('pagechanged', e);

  indicator && indicator.close();
});

client.start();
