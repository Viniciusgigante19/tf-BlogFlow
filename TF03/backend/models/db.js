import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(
        'blogdb',
        'bloguser',
        'blogpass',
  {
    host:    'database',
    dialect: 'postgres',
    logging: false,
  },console.log("Connected to the database was successful!")
);

export default sequelize;