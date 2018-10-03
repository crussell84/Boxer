var db = require("../models");

module.exports = function (app, passport) {
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

  app.post('/api/users/add', passport.authenticate("local-signup", {
    successRedirect: "/dashboard",
    failureRedirect: "/createAccount"
  }))

  //Login user
  app.post('/api/login', function (req, res) {
    db.User.findOne({
      where: {
        username: req.body.username
      }
    }).then(function (user) {
      if (!user) {
        res.redirect('/');
      } else {
        bcrypt.compare(req.body.password, user.password, function (err, result) {
          if (result == true) {
            res.redirect('/dashboard');
          } else {
            res.send('Invalid login credentials');
            res.redirect('/');
          }
        });
      }
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

};
