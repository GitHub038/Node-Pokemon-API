/* L’API Rest et la Base de données : Créer un modèle Sequelize */

const validTypes = [
  "Plante",
  "Poison",
  "Feu",
  "Eau",
  "Insecte",
  "Vol",
  "Normal",
  "Electrik",
  "Fée",
];

module.exports = (sequelize, DataTypes) => {
  // DataTypes permet de définir le type de données de chaque propriétés de notre modèle
  return sequelize.define(
    // define permet de déclarer un nouveau model auprès de sequelize
    // define prend 3 paramètres : le nom du modèle (ici Pokemon), description de notre modèle, option de paramétrage global
    "Pokemon",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false, // dire si elles sont facultatives ou non
        unique: {
          msg: "Le nom est déjà pris.",
        },
        validate: {
          notEmpty: {
            msg: "Le nom ne peut pas être vide.",
          },
          notNull: { msg: "Le nom est une propriété requise." },
        },
      },
      hp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: {
            msg: "Utilisez uniquement des nombres entiers pour les points de vie.",
          },
          notNull: { msg: "Les points de vie sont une propriété requise." },
          min: {
            args: [0],
            msg: "Les points de vie doivent être supérieurs ou égales à 0",
          },
          max: {
            args: [999],
            msg: "Les points de vie doivent être inférieurs ou égales à 999",
          },
        },
      },
      cp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: {
            msg: "Utilisez uniquement des nombres entiers pour les points de dégâts.",
          },
          min: {
            args: [0],
            msg: "Les points de vie doivent être supérieurs ou égales à 0",
          },
          max: {
            args: [99],
            msg: "Les points de vie doivent être inférieurs ou égales à 99",
          },
          notNull: { msg: "Les points de vie sont une propriété requise." },
        },
      },
      picture: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isUrl: {
            msg: "Utilisez uniquement une URL valide pour l'image .",
          },
          notNull: { msg: "L'image est une propriété requise." },
        },
      },
      types: {
        type: DataTypes.STRING,
        allowNull: false,
        get() {
          return this.getDataValue("types").split(",");
        },
        set(types) {
          this.setDataValue("types", types.join());
        },
        validate: {
          isTypeValid(value) {
            if (!value) {
              throw new Error("Un pokémon doit au moins avoir un type");
            }
            if (value.split(",").length > 3) {
              throw new Error(
                "Un pokémon ne peux pas avoir plus de trois type"
              );
            }
            value.split(",").forEach((type) => {
              if (!validTypes.includes(type)) {
                throw new Error(
                  `Le type d'un pokémon doit appartenir à la liste suivante : ${validTypes}`
                );
              }
            });
          },
        },
      },
    },
    {
      timestamps: true, // indique qu'on souhaite modifier le comportement par default de sequelize
      createdAt: "created", // date de création d'une nouvelle instance (ici d'un pokemon du modele)
      updatedAt: false, // date de modification d'une instance du modèle, ici elle n'est pas utilisée
    }
  );
};
