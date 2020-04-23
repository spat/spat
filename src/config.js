import user_config from '../../../spalate.config.js'

// デフォルト値を設定
var config = spalate.utils.extendDeep({
  server: {
    cache: false,
    ssr: true,
  },
  client: {
    env: process.env.NODE_ENV || 'development',
    head: {
      lang: 'ja',
    }
  },
}, user_config);

// console.log(config);

module.exports = config;
export default config;
