// npm/file linking
// path will be used once its all in handlebars
const path = require("path");
const isAuthenticated = require("../config/middleware/isAuthenticated.js");

module.exports = (app) => {

  app.get("/", (req, res) => {
    if (req.user) {
      res.redirect("/dashboard");
    }

    res.sendFile('code/login.html', { root: "../" });
  });

  app.get("/signup", (req, res) => {
    if (req.user) {
      res.redirect("/dashboard");
    }

    res.sendFile('code/createAcc.html', { root: "../" });
  });

  app.get("/dashboard", isAuthenticated, (req, res) => {
    res.sendFile('code/dashboard.html', { root: "../" });
  });

  app.get("/products", isAuthenticated, (req, res) => {
    res.sendFile("code/products.html", { root: "../" })
  });

  app.get("/catagories", isAuthenticated, (req, res) => {
    res.sendFile('code/catagories.html', { root: "../" });
  });

  // Render 404 page for any unmatched routes
  app.get("*", (req, res) => {
    res.render("404");
  });
};
