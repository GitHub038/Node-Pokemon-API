const { Pokemon } = require("../db/sequelize");

module.exports = (app) => {
  app.post("/api/pokemons", (req, res) => {
    Pokemon.create(req.body)
      .then((pokemon) => {
        const message = `Le pokémon ${req.body.name} a bien été crée.`;
        res.json({ message, data: pokemon });
      })
      .catch((error) => {
        const message = `La liste des pokémons n'a pas pu être récupérée. Réessayez dans quelques instants.`;
        res.statut(500).json({ message, data: error });
      });
  });
};