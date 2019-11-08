const fs = require('fs');
const path = require('path');
const express = require('express');
const Bundler = require('parcel-bundler');
const app = express();

utils = {
  path: {
    // 今実行中のファイルディレクトリ(spalate の root)
    current: (p) => {
      return path.join(__dirname, p);
    },
    // 実行を開始したワーキングディレクトリ
    working: (p) => {
      return path.join(process.cwd(), p);
    },
  }
};

// setup static
app.use(express.static(`${process.cwd()}/public`));

// setup pug
app.set('views', utils.path.current('views'));
// app.set('views', path.join(process.cwd(), 'views'));

app.set('view engine', 'pug');

// const bundler = new Bundler(utils.path.working('app/main.js'), {
//   outdir: 'main'
// });
const bundler = new Bundler(utils.path.current('src/main.js'), {
  outDir: 'public/scripts',
  outFile: 'spalate.js',
});
app.use(bundler.middleware());

// setup routing
app.get('/', async (req, res) => {
  res.render('index', {
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});