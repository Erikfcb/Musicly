// npm install http-proxy-middleware --save

const proxy = require("http-proxy-middleware");

module.exports = function(app) {
  app.use(proxy("/api/signup/checkexist", { target: "http://localhost:5000" }));
  app.use(proxy("/api/games", { target: "http://localhost:5000" }));
  
};
