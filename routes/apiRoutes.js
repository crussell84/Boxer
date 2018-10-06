// npm/file linking
const db = require("../models");
const passport = require("../config/passport/passport.js")

module.exports = (app) => {
  // Used for logging in
  app.post("/api/login", passport.authenticate("local"), (req, res) => {
    res.json("/dashboard");
  });

  // Used for creating an account
  app.post("/api/signup", function(req, res) {
    db.User.create({
      username: req.body.username,
      password: req.body.password
    }).then(() => {
      res.json("/dashboard");
    })
    .catch((err) => {
      console.log("Error:", err);
      res.json(err);
    })
  });

  // Used to get data on who is currently logged in
  app.get("/api/users/data", (req, res) => {
    if (!req.user) {
      res.json({});
    }
    else {
      res.json({
        username: req.user.username,
        id: req.user.id
      });
    }
  });

  // Used to log the user out
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });


  // Get all examples
  app.get("/api/products/:user", function (req, res) {

    // need to get userID from front end and include that in the request to filter the table by user
    db.Product.findAll({ where: { userID: req.params.user } }).then(data => {
      res.json(data);
    });
  });

  // Create a new product - in this case expecting front end to pass a single object with the needed properties
  app.post("/api/products/add", function (req, res) {
    db.Product.create(req.body).then(data => {
      res.json(data);
    });
  });

  // Delete a product by id - paranoid is on, so will be soft deletes
  app.delete("/api/products/:id", function (req, res) {
    db.Product.destroy({ where: { id: req.params.id } }).then(data => {
      res.json(data);
    });
  });

  // Update a product - again, expecting a single object with properties from the front end
  app.put("/api/products", function (req, res) {
    db.Product.update(
      req.body,
      {
        where: {
          id: req.body.id
        }
      }).then(data => {
        res.json(data);
      });
  });

  //delete user
  app.delete("/api/users/:id", function (req, res) {
    db.User.destroy({ where: { id: req.params.id } }).then(data => {
      res.json(data);
    });
  });

  //update user
  app.put("/api/users", function (req, res) {
    db.User.update(
      req.body,
      {
        where: {
          id: req.body.id
        }
      }).then(data => {
        res.json(data);
      });
  });

  app.get("/api/products/:user/lowstock", function (req, res) {

    // need to get userID from front end and include that in the request to filter the table by user
    db.Product.findAll({ where: { 
      userID: req.params.user,
      currentQuantity: {$lte: db.sequelize.col('reorderThreshold')}
    } }).then(data => {
      res.json(data);
    });
  });
  app.get("/api/products/:user/newest", function (req, res) {

    // need to get userID from front end and include that in the request to filter the table by user
    db.Product.findAll({ where: { 
      userID: req.params.user
    }, order: db.sequelize.col('createdAt'), limit: 3 }).then(data => {
      res.json(data);
    });
  });
};
