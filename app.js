const express = require("express"); // require permet de récupérer la dépendance express depuis node_modules
const morgan = require("morgan");
const favicon = require("serve-favicon");
const bodyParser = require("body-parser");
const { Sequelize, DataTypes } = require("sequelize");
const { success, getUniqueId } = require("./helper.js");
let pokemons = require("./mock-pokemon");
const PokemonModel = require("./src/models/pokemons");

const app = express(); // création d'une instance d'une application express (serveur web sur lequel va fonctionner notre API Rest)
const port = 3000; // port sur lequel l'API Rest va démarrer

const sequelize = new Sequelize("pokedex", "root", "", {
  host: "localhost",
  dialect: "mariadb",
  dialectOptions: {
    timezone: "Etc/GMT-2",
  },
  logging: false,
});

sequelize
  .authenticate()
  .then((_) =>
    console.log("La connextion à la base de données a bien été établie.")
  )
  .catch((error) =>
    console.error(`Impossible de se connecter à la base de données ${error}`)
  );

const Pokemon = PokemonModel(sequelize, DataTypes); // instanciation du Model Pokemon

sequelize
  .sync({ force: true }) // permet de supprimer la table associée à chaque modele avant la synchro. Efface la table présente (le tps du dev)
  .then((_) => {
    console.log('La base de données "Pokedex" a bien été synchronisée.');

    pokemons.map((pokemon) => {
      Pokemon.create({
        name: pokemon.name,
        hp: pokemon.hp,
        cp: pokemon.cp,
        picture: pokemon.picture,
        types: pokemon.types.join(),
      }).then((bulbizarre) => console.log(bulbizarre.toJSON()));
    });
  });

app
  .use(favicon(__dirname + "/favicon.ico"))
  .use(morgan("dev")) // morgan paramétré en fct des messages de log que l'on veut, ici "dev"
  .use(bodyParser.json());

app.get("/", (req, res) => res.send("Hello, Express !")); // 1er Endpoint
// 2eme argument est une fonction dont le rôle est de fournir une réponse au client lorsque l'on sera sur la route "/"
// "req" est l'objet de la requete reçue et "res" l'objet réponse envoyé depuis express au client

app.get("/api/pokemons/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const pokemon = pokemons.find((pokemon) => pokemon.id === id);
  const message = "Une pokémon a été trouvé";
  res.json(success(message, pokemon));
});

app.get("/api/pokemons", (req, res) => {
  const message = "La liste des pokémons a bien été récupérée";
  res.json(success(message, pokemons));
});

app.post("/api/pokemons", (req, res) => {
  const id = getUniqueId(pokemons);
  const pokemonCreated = { ...req.body, ...{ id: id, created: new Date() } };
  pokemons.push(pokemonCreated);
  const message = `Le pokemon ${pokemonCreated.name} a bien été crée.`;
  res.json(success(message, pokemonCreated));
});

app.put("/api/pokemons/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const pokemonUpdated = { ...req.body, id: id };
  pokemons = pokemons.map((pokemon) => {
    return pokemon.id === id ? pokemonUpdated : pokemon;
  });
  const message = `Le pokémon ${pokemonUpdated.name} a bien été modifié.`;
  res.json(success(message, pokemonUpdated));
});

app.delete("/api/pokemons/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const pokemonDeleted = pokemons.find((pokemon) => pokemon.id === id);
  pokemons.filter((pokemon) => pokemon.id !== id);
  const message = `Le pokémon ${pokemonDeleted.name} a bien été supprimé.`;
  res.json(success(message, pokemonDeleted));
});

app.listen(port, () =>
  // démarrage de l'API Rest sur le port 3000
  console.log(
    `Notre application Node est démarrée sur : http://localhost:${port}`
  )
);
