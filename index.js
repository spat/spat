const fs = require('fs-extra');
const path = require('path');
const riot = require('riot');
const express = require('express');
const Bundler = require('parcel-bundler');
const builder = require('./src/builder');

var SPALATE_OUTPUT_DIR = `${process.cwd()}/.spalate`;

// コピーする
if (!process.env.PORT) {
  builder.copy();
}

var main = async () => {
  if (!process.env.PORT) {
    await bundleServerModules();
  }

  // 全てまとめたファイルを実行
  require(`${SPALATE_OUTPUT_DIR}/modules.cjs`);
};

var createParcelBundler = () => {
  var config;

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
    watch: true,
  };

  var bundler = new Bundler(entry, config);

  return bundler;
};

var bundleServerModules = async () => {
  var bundler = createParcelBundler();


  await bundler.bundle();
};


main();