import { Sequelize, SequelizeOptions } from 'sequelize-typescript';

const sequelizeOptions: SequelizeOptions = {
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'blackhole',
  dialect: 'postgres',
  models: [__dirname + '\\src\\Models'],
};

export const sequelize = new Sequelize(sequelizeOptions);

export const createClientAndConnect = async (): Promise<Sequelize | null> => {
  try {
    // const client = new Client({
    //   user: 'postgres',
    //   host: 'localhost',
    //   database: 'blackhole',
    //   password: 'postgres',
    //   port: 5432,
    // });

    await sequelize.sync();

    // await client.connect();

    // const res = await client.query('SELECT NOW()');
    // console.log('  ➜ 🎸 Connected to the database at:', res?.rows?.[0].now);
    // client.end();

    return sequelize;
  } catch (e) {
    console.error(e);
  }

  return null;
};
