module.exports = app => {
  const tutorials = require("../controllers/tutorial.controller.js");

  var router = require("express").Router();

  // Crea nuevo Tutorial
  router.post("/", tutorials.create);

  // trae todos los Tutoriales
  router.get("/", tutorials.findAll);

  // Trae todos los  Tutorials publicados
  router.get("/published", tutorials.findAllPublished);

  // TRae un tuto por un id especifico
  router.get("/:id", tutorials.findOne);

  // Actualiza un tuto por id
  router.put("/:id", tutorials.update);

  // borra un tuto por id
  router.delete("/:id", tutorials.delete);

  // borra todos los tuto
  router.delete("/", tutorials.deleteAll);

  app.use('/api/tutorials', router);
};
