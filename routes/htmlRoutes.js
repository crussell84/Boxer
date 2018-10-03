var db = require("../models");

module.exports = function(app) {

  app.get("/", (req, res) => {
    res.sendFile('code/login.html', { root: "../"});
  });

  app.get("/createAccount", (req, res) => {
    res.sendFile('code/createAcc.html', { root: "../"});
  });

  app.get("/dashboard", (req, res) => {
    res.sendFile('code/dashboard.html', { root: "../"});
  });

  app.get("/products", (req, res) => {
    res.sendFile('code/products.html', { root: "../"});
  });

  app.get("/catagories", (req, res) => {
    res.sendFile('code/catagories.html', { root: "../"});
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
