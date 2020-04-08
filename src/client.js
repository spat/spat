// import config from './config.js'
// import firerest from 'firerest'

// // spalate は global とする
import spalate from './spalate.js'
global.spalate = spalate;

// ここからは client 用
import riot from 'riot'

spalate.start = () => {
  riot.mount('*');
};

export default spalate;