/* L’API Rest et la Base de données : Créer un modèle Sequelize */
const { Sequelize, DataTypes } = require("sequelize");
const PokemonModel = require("../models/pokemon");
const pokemons = require("./mock-pokemon");

const sequelize = new Sequelize("pokedex", "root", "", {
  host: "localhost",
  dialect: "mariadb",
  dialectOptions: {
    timezone: "Etc/GMT-2",
  },
  logging: false,
});

const Pokemon = PokemonModel(sequelize, DataTypes); // instanciation du Model Pokemon

const initDb = () => {
  return sequelize.sync({ force: true }).then((_) => {
    //{ force: true } permet de supprimer la table associée à chaque modele avant la synchro. Efface la table présente (le tps du dev)
    pokemons.map((pokemon) => {
      Pokemon.create({
        name: pokemon.name,
        hp: pokemon.hp,
        cp: pokemon.cp,
        picture: pokemon.picture,
        types: pokemon.types,
      }).then((pokemon) => console.log(pokemon.toJSON()));
    });
    console.log("La base de donnée a bien été initialisée !");
  });
};

module.exports = {
  initDb,
  Pokemon,
};
