const riot = require('riot');
const sdom = require('riot/lib/server/sdom.js');
riot.util.tmpl.errorHandler = function() {};
const fetch = require('node-fetch');

// ssr 対策
global.fetch = fetch;

module.exports = class Ssriot {
  constructor() {
  }

  async render({req, res, route, isSsr}) {
    var element = document.createElement('div');
    element.setAttribute('render', 'server');
    element.setAttribute('data-is', 'spat-app');
    
    this.tag = riot.mount(element)[0];

    if (isSsr) {
      await this.tag.gotoPage(route, req, res);

      this.tag.triggerWithChildren(this.tag.pageTag, 'server', {
        req, res
      });
    }
    else {
      this.tag.head = spat.config.head;
    }

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
    <link rel="stylesheet", href='/spat/modules.css' />
    <style render="server" type="text/css">${styleText}</style>
`;
  }

  content() {
    return `
    ${this.tagContent}
`;
  }

  scripts() {
    return `
    <script>
    var spat = {};
    spat.config = ${JSON.stringify(spat.config)};
    spat.plugins = ${JSON.stringify(spat.plugins)};
    </script>
    <script src="/spat/modules.js"></script>
`;
  }
};
