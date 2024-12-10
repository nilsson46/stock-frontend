const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/stocks',
    createProxyMiddleware({
      target: 'http://stock.strangled.net',
      changeOrigin: true,
    })
  );
  app.use(
    '/addstock',
    createProxyMiddleware({
      target: 'http://stock.strangled.net',
      changeOrigin: true,
    })
  );
};