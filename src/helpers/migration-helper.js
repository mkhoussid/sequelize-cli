import _ from 'lodash';
import helpers from './index';

const Sequelize = helpers.generic.getSequelize();

module.exports = {
  getTableName(modelName) {
    return Sequelize.Utils.pluralize(modelName);
  },

  generateTableCreationFileContent(args) {
    return helpers.template.render('migrations/create-table.js', {
      tableName: args.name, // this.getTableName(args.name),
      attributes: helpers.model.transformAttributes(args.attributes),
      associations: args.associations ? _index.default.model.transformAttributes(args.associations, false) : [],
      createdAt: args.underscored ? 'created_at' : 'createdAt',
      updatedAt: args.underscored ? 'updated_at' : 'updatedAt',
      schema: args.schema
    });
  },

  generateMigrationName(args) {
    return _.trimStart(_.kebabCase('create-' + args.name), '-');
  },

  generateTableCreationFile(args) {
    const migrationName = this.generateMigrationName(args);
    const migrationPath = helpers.path.getMigrationPath(migrationName, args.schema);

    helpers.asset.write(
      migrationPath,
      this.generateTableCreationFileContent(args)
    );
  },
};
