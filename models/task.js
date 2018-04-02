module.exports = function(sequelize, DataTypes) {
  var Task = sequelize.define("Task", {
    task_text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    task_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    isdone: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    use_ai:{
      type: DataTypes.BOOLEAN,
      allowNull: true,
    }
  });

  Task.associate = function(models) {
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    Task.belongsTo(models.User, {
      foreignKey: {
        allowNull: true
      }
    });
  };
  return Task;
};