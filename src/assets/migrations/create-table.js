'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('<%= tableName %>', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },

      <% attributes.forEach(function(attribute) { %>
        <%= attribute.fieldName %>: {
          type: Sequelize.<%= attribute.dataFunction ? `${attribute.dataFunction.toUpperCase()}(Sequelize.${attribute.dataType.toUpperCase()})` : attribute.dataValues ? `${attribute.dataType.toUpperCase()}(${attribute.dataValues})` : attribute.dataType.toUpperCase() %>
        },
      <% }) %>

      <% associations.forEach(function(association) { %>
        <%= association.modelName %>_id: {
          type: Sequelize.DataTypes.INTEGER,
          references: {
            model: {
              tableName: '<%= association.tableName %>',
              schema: '<%= schema %>'
            },
            key: 'id'
          },
          allowNull: false,
          unique: true
        },
      <% }) %>
		// userId: {
		// 	type: Sequelize.DataTypes.INTEGER,
		// 	references: {
		// 	  model: {
		// 		tableName: 'users',
		// 		schema: 'schema'
		// 	  },
		// 	  key: 'id'
		// 	},
		// 	allowNull: false
		//   },
    }, {
      schema: '<%= schema %>'
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('<%= tableName %>', {
      schema: '<%= schema %>'
    });
  }
};
