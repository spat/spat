var riot = require('riot');
var sdom = require('riot/lib/server/sdom.js');
riot.util.tmpl.errorHandler = function() {};

module.exports = class Ssriot {
  constructor(tagName) {
    this.tagName = tagName;
  }

  async render({req, res}) {
    this.template = riot.util.templates[this.tagName];

    var noop = function() { };
    this.dummyTag = {
      on: noop,
      one: noop,
      mixin: noop,
    };

    this.template.fn.call(this.dummyTag, {});

    if (this.dummyTag.fetch) {
      this.data = await this.dummyTag.fetch({
        req,
        res,
      });
    }

    var root = document.createElement('div');
    root.setAttribute('data-is', this.tagName);

    this.tag = riot.mount(root)[0];
    Object.assign(this.tag, this.data);

    this.tag.update();
    this.content = sdom.serialize(this.tag.root);
  }
};
