import config from '../../../spalate.config.js'

// config.env = config.env || 'temp';
config.client.env = process.env.NODE_ENV || 'development';

module.exports = config;
export default config;
