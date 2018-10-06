// npm/file linking
// path will be used once its all in handlebars
const path = require("path");
const isAuthenticated = require("../config/middleware/isAuthenticated.js");

module.exports = (app) => {

  app.get("/", (req, res) => {
    if (req.user) {
      res.redirect("/dashboard");
    }

    res.sendFile(path.join("public/html/index.html"), {root: './'});
  });

  app.get("/signup", (req, res) => {
    if (req.user) {
      res.redirect("/dashboard");
    }

    res.sendFile(path.join(__dirname,"public/html/creatAcc.html"));
  });

  app.get("/dashboard", isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname,"public/html/dashboard.html"));
  });

  app.get("/products", isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname,"public/html/products.html"))
  });

  app.get("/categories", isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname,"public/html/categories.html"));
  });

  // Render 404 page for any unmatched routes
  app.get("*", (req, res) => {
    res.render("404");
  });
};
