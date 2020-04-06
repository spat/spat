import { isBrowser, isNode } from 'browser-or-node';
import riot from 'riot'

if (isBrowser) {
  console.log('ブラウザだよ');

  window.onload = () => {
    riot.mount('*');
  };
}
