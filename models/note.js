module.exports = function(sequelize, DataTypes) {
  var Note = sequelize.define("Note", {
    note_text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    note_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    location: {
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