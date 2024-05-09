const { Pokemon } = require("../db/sequelize");
const pokemons = require("../db/mock-pokemon");
const { Op } = require("sequelize");

module.exports = (app) => {
  app.get("/api/pokemons", (req, res) => {
    if (req.query.name) {
      const name = req.query.name; //indique à Express qu'on souhaite recuperer le paramètre name de l'URL

      if (name.length < 2) {
        const message = `Le terme de recherche doit contenir au moins 2 caractères.`;
        return res.status(400).json({ message });
      }
      return Pokemon.findAndCountAll({
        where: {
          //'name' est la propriété du modèle pokemon
          name: {
            [Op.like]: `%${name}%`, // 'name' est le critère de la recherche
          },
        },
        order: ["name"],
        limit: parseInt(req.query.limit) || 5,
      }).then(({ count, rows }) => {
        // noms des paramètres retournés par 'findAndCountAll' imposés
        const message = `Il y a ${count} pokémons qui correspondent au terme de recherche ${name}`;
        res.json({ message, data: rows });
      });
    } else {
      Pokemon.findAll({
        order: ["name"],
        limit: parseInt(req.query.limit) || parseInt(5),
      })
        .then((pokemons) => {
          const message = "La liste des pokémons a bien été récupérée.";
          res.json({ message, data: pokemons });
        })
        .catch((error) => {
          const message = `La liste des pokémons n'a pas pu être récupérée. Réessayez dans quelques instants.`;
          res.status(500).json({ message, data: error });
        });
    }
  });
};
