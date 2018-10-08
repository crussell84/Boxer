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

    res.sendFile(path.join("public/html/createAcc.html"), {root: './'});
  });

  app.get("/dashboard", isAuthenticated, (req, res) => {
    res.sendFile(path.join("public/html/dashboard.html"), {root: './'});
  });

  app.get("/products", isAuthenticated, (req, res) => {
    res.sendFile(path.join("public/html/products.html"), {root: './'})
  });

  app.get("/categories", isAuthenticated, (req, res) => {
    res.sendFile(path.join("public/html/categories.html"), {root: './'});
  });

  // Edit products, Still working on
  app.get("/products/edit/:productID", isAuthenticated, (req, res) => {
    res.sendFile(path.join("public/html/edit.html"), {root: './'})
  });

  app.get("/products/delete/:productID", isAuthenticated, (req, res) => {
    res.sendFile(path.join("public/html/delete.html"), {root: './'})
  });

  // Render 404 page for any unmatched routes
  app.get("*", (req, res) => {
    res.render("404");
  });
};
