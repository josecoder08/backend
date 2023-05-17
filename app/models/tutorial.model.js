const sql = require("./db.js");

// constructor
const Tutorial = function(tutorial) {
  this.title = tutorial.title;
  this.description = tutorial.description;
  this.cilindrada = tutorial.cilindrada;
  this.anoLanzamiento = tutorial.anoLanzamiento;
  this.frenos = tutorial.frenos;
  this.velocidadMaxima = tutorial.velocidadMaxima;
  this.torqueMaximo = tutorial.torqueMaximo;
  this.peso = tutorial.peso;
  this.published = tutorial.published;
};

Tutorial.create = (newTutorial, result) => {
  sql.query("INSERT INTO motos SET ?", newTutorial, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("tutorial creado: ", { id: res.insertId, ...newTutorial });
    result(null, { id: res.insertId, ...newTutorial });
  });
};

Tutorial.findById = (id, result) => {
  sql.query(`SELECT * FROM motos WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("moto encontrada: ", res[0]);
      result(null, res[0]);
      return;
    }

    // No encuentro el tuto con id
    result({ kind: "not_found" }, null);
  });
};

Tutorial.getAll = (title, result) => {
  let query = "SELECT * FROM motos";

  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("motos: ", res);
    result(null, res);
  });
};

Tutorial.getAllPublished = result => {
  sql.query("SELECT * FROM motos WHERE published=true", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("motos: ", res);
    result(null, res);
  });
};

Tutorial.updateById = (id, tutorial, result) => {
  sql.query(
    "UPDATE motos SET title = ?, description = ?, cilindrada = ?,anoLanzamiento=?,frenos=?,velocidadMaxima=?,torqueMaximo=?,peso=? WHERE id = ?",
    [tutorial.title, tutorial.description, tutorial.cilindrada,tutorial.anoLanzamiento, tutorial.frenos,tutorial.velocidadMaxima,tutorial.torqueMaximo, tutorial.peso, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // no encuentro tuto con id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated tutorial: ", { id: id, ...tutorial });
      result(null, { id: id, ...tutorial });
    }
  );
};

Tutorial.remove = (id, result) => {
  sql.query("DELETE FROM motos WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // no encuentro tuto con id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("tuto borrado con id: ", id);
    result(null, res);
  });
};

Tutorial.removeAll = result => {
  sql.query("DELETE FROM motos", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`tutos ${res.affectedRows} borrados`);
    result(null, res);
  });
};

module.exports = Tutorial;
