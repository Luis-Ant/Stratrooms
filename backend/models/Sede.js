export default (sequelize, DataTypes) => {
  const Sede = sequelize.define("Sede", {
    idSede: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombreSede: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    direccionSede: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    logoUrl: {
      type: DataTypes.STRING(255),
    },
  });

  Sede.associate = (models) => {
    Sede.hasMany(models.Usuario, { foreignKey: "idSede" });
    Sede.hasMany(models.Curso, { foreignKey: "idSede" });
  };

  return Sede;
};
