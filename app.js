const express = require("express"); // require permet de récupérer la dépendance express depuis node_modules
const morgan = require("morgan");
const favicon = require("serve-favicon");
const bodyParser = require("body-parser");
const sequelize = require("./src/db/sequelize");

const app = express(); // création d'une instance d'une application express (serveur web sur lequel va fonctionner notre API Rest)
const port = 3000; // port sur lequel l'API Rest va démarrer

app
  .use(favicon(__dirname + "/favicon.ico"))
  .use(morgan("dev")) // morgan paramétré en fct des messages de log que l'on veut, ici "dev"
  .use(bodyParser.json());

sequelize.initDb();

// Ici, nous placerons nos futurs points de terminaison.
require("./src/routes/findAllPokemons")(app);
require("./src/routes/findPokemonByPk")(app);
require("./src/routes/createPokemon")(app);
require("./src/routes/updatePokemon")(app);
require("./src/routes/deletePokemon")(app);

// On ajoute la gestion des erreurs 404
// Express va intercepter toutes les demandes du client qui ne correspondent pas à une route déclarée précedemment
app.use(({ res }) => {
  const message =
    "Impossible de trouver la ressource demandée ! Vous pouvez essayer une autre URL.";
  res.status(404).json({ message }); // on indique le code de statut http à retourner à nos clients
});

app.listen(port, () =>
  // démarrage de l'API Rest sur le port 3000 (démarrage du serveur express)
  console.log(
    `Notre application Node est démarrée sur : http://localhost:${port}`
  )
);
