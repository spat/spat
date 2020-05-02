import server from '.spat/modules/server'

server.get('/api/me', (req, res) => {
  res.json({
    name: 'phi',
    age: '30',
    bloodType: 'O',
  })
});

server.start();