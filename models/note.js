module.exports = function(sequelize, DataTypes) {
  var Note = sequelize.define("Note", {
    n_header: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    n_notedate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    n_location: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    n_content: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    n_image: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  });
  
  Note.associate = function(models) {
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    Note.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Note;
};