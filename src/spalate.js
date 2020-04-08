import { isBrowser, isNode } from 'browser-or-node';

console.log('isNode', isNode);
console.log('isBrowser', isBrowser);

export default {
  isNode,
  isBrowser,
};
