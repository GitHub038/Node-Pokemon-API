const express = require("express"); // require permet de récupérer la dépendance express depuis node_modules
let pokemons = require("./mock-pokemon");

const app = express(); // création d'une instance d'une application express (serveur web sur lequel va fonctionner notre API Rest)
const port = 3000; // port sur lequel l'API Rest va démarrer

app.get("/", (req, res) => res.send("Hello, Express !")); // 1er Endpoint
// 2eme argument est une fonction dont le rôle est de fournir une réponse au client lorsque l'on sera sur la route "/"
// "req" est l'objet de la requete reçue et "res" l'objet réponse envoyé depuis express au client

app.get("/api/pokemons/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const pokemon = pokemons.find((pokemon) => pokemon.id === id);
  res.send(`Vous avez demandé le pokémon ${pokemon.name}`);
});

app.get("/api/pokemons", (req, res) => {
  res.send(
    `Il y a ${pokemons.length} pokémons dans le pokédex pour le moment.`
  );
});

app.listen(port, () =>
  // démarrage de l'API Rest sur le port 3000
  console.log(
    `Notre application Node est démarrée sur : http://localhost:${port}`
  )
);
