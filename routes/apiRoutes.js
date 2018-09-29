var db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/api/products/:user", function(req, res) {
  
// need to get userID from front end and include that in the request to filter the table by user
    db.Product.findAll({where: {userID: req.params.user}}).then(function(dbExamples) {
      res.json(dbExamples);
    });
  });

  // Create a new example
  app.post("/api/examples", function(req, res) {
    db.Example.create(req.body).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
      res.json(dbExample);
    });
  });
};
