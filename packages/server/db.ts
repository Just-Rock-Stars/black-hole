import { Sequelize, SequelizeOptions } from 'sequelize-typescript';

const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_PORT } = process.env;

const path = require('node:path');

const sequelizeOptions: SequelizeOptions = {
  host: 'postgres',
  port: Number(POSTGRES_PORT),
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  dialect: 'postgres',
  models: [path.join(__dirname, 'src', 'Models')],
};

export const sequelize = new Sequelize(sequelizeOptions);

export const createClientAndConnect = async (): Promise<Sequelize | null> => {
  try {
    await sequelize.sync();

    console.log('  ➜ 🎸 Connected to the database at:');

    return sequelize;
  } catch (e) {
    console.error(e);
  }

  return null;
};
