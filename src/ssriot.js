const riot = require('riot');
const sdom = require('riot/lib/server/sdom.js');
riot.util.tmpl.errorHandler = function() {};
const fetch = require('node-fetch');

global.fetch = fetch;

module.exports = class Ssriot {
  constructor(tagName) {
    this.tagName = tagName;
  }

  async render({req, res}) {
    var element = document.createElement('div');
    element.setAttribute('render', 'server');
    element.setAttribute('data-is', 'spalate-app');
    
    this.tag = riot.mount(element)[0];
    await this.tag.gotoPage(this.tagName, req, res);

    this.tagContent = sdom.serialize(this.tag.root);
  }

  head() {
    
  }

  styles() {
    var styleText = Object.values(riot.util.templates).map(template => {
      return template.css;
    }).join('\n');

    return `
    <link rel="stylesheet", href='/spalate/modules.css' />
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
    var spalate = {};
    spalate.config = ${JSON.stringify(spalate.config)};
    </script>
    <script src="/spalate/modules.js"></script>
`;
  }
};
