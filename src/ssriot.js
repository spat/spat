const riot = require('riot');
const sdom = require('riot/lib/server/sdom.js');
riot.util.tmpl.errorHandler = function() {};
const fetch = require('node-fetch');
const TIMESTAMP = Date.now();
// ssr 対策
global.fetch = fetch;

module.exports = class Ssriot {
  modulesJsPath = '/spat/modules.js'
  modulesCssPath = '/spat/modules.css'
  timestamp = TIMESTAMP
  constructor() {
  }

  async render({req, res, route, isSsr}) {
    var element = document.createElement('div');
    element.setAttribute('render', 'server');
    element.setAttribute('data-is', 'spat-app');
    // SSR レンダリング時は非表示にする(未ログイン時の表示とかがちらつくので)
    element.setAttribute('style', 'opacity:0');
    
    this.tag = riot.mount(element)[0];

    await this.tag.navTag.goto({ route, req, res, ssr: isSsr });

    this.tagContent = sdom.serialize(this.tag.root);
  }

  unmount() {
    if (this.tag) {
      this.tag.unmount();
      this.tag = null;
    }
  }

  head() {
    
  }

  styles() {
    var styleText = Object.values(riot.util.templates).map(template => {
      return template.css;
    }).join('\n');

    return `
    <link rel="stylesheet" href="${this.modulesCssPath}" />
    <style render="server" type="text/css">${styleText}</style>
`;
  }

  content() {
    return `
    ${this.tagContent}
`;
  }

  cacheScript() {
    if (this.tag.navTag._preloadCache) {
      return `
      <script>spat._preload_cache = ${JSON.stringify(this.tag.navTag._preloadCache).replace(/<\/script/ig, '<\\/script')};</script>
`;
    }
    else {
      return '';
    }
  }

  configScript() {
    return `
    <script>
    var spat = {};
    spat.config = ${JSON.stringify(spat.config)};
    spat.plugins = ${JSON.stringify(spat.plugins)};
    </script>
    ${this.cacheScript()}
`;
  }

  scripts() {
    return `
    ${this.configScript()}
    <script src="${this.modulesJsPath}" async></script>
`;
  }
};
