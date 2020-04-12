const fs = require('fs-extra');
const path = require('path');
const riot = require('riot');
const express = require('express');
const Bundler = require('parcel-bundler');

var SPALATE_OUTPUT_DIR = `${process.cwd()}/.spalate`;

// コピーする
fs.copySync(`${__dirname}/src`, 'app/node_modules/@spalate');

// config
// const config = require(`./src/config.js`);

var main = async () => {
  await bundleServerModules();
  require(`${SPALATE_OUTPUT_DIR}/modules.cjs`);
};

var createParcelBundler = (target) => {
  var config;

  if (target === 'node') {
    var entry = path.join(process.cwd(), 'app/server.js');
    config = {
      target: 'node',
      bundleNodeModules: false,
      outDir: `${SPALATE_OUTPUT_DIR}`,
      outFile: 'modules.cjs',
      hmr: false,
      global: 'spalate',
      cache: false,
      sourceMaps: false,  
    };
  }
  else {
    var entry = path.join(process.cwd(), 'app/index.js');
    config = {
      target: 'browser',
      bundleNodeModules: true,
      outDir: `${SPALATE_OUTPUT_DIR}/public`,
      outFile: 'modules.js',
      hmr: process.env.NODE_ENV !== 'production',
      global: 'spalate',
      cache: false,  
    };
  }

  var bundler = new Bundler(entry, config);

  return bundler;
};


var bundleServerModules = async () => {
  var bundler = createParcelBundler('node');
  await bundler.bundle();
};


main();