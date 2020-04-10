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
    element.setAttribute('data-is', 'app');
    
    this.tag = riot.mount(element)[0];
    await this.tag.gotoPage(this.tagName, req, res);

    this.content = sdom.serialize(this.tag.root);
  }
};
