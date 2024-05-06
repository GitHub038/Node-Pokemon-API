/* L’API Rest et la Base de données : Créer un modèle Sequelize */
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
      },
      hp: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      cp: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      picture: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      types: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: true, // indique qu'on souhaite modifier le comportement par default de sequelize
      createdAt: "created", // date de création d'une nouvelle instance (ici d'un pokemon du modele)
      updatedAt: false, // date de modification d'une instance du modèle, ici elle n'est pas utilisée
    }
  );
};
