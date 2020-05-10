import server from '.spat/modules/server'


server.use((req, res, next) => {
  // キャッシュを消す
  if (req.query.cache === 'false') {
    server.clearCache(req.Url.pathname);
  }

  next();
});

server.get('/api/me', (req, res) => {
  res.json({
    name: 'phi',
    age: '30',
    bloodType: 'O',
  })
});

server.get('/api/caches', (req, res) => {
  res.json(server.caches);
});



server.start();