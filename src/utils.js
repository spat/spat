const path = require('path');

module.exports = {
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
