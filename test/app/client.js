import client from '.spat/modules/client';


var indicator = null;
spat.appTag.navTag.on('pagechange', (e) => {
  console.log('pagechange', e);
  indicator = spat.modal.indicator();
});

spat.appTag.navTag.on('pagechanged', (e) => {
  console.log('pagechanged', e);

  indicator && indicator.close();
});

// client.showSSR();

client.start();
