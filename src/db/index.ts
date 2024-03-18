import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './data/main.db',
  logging: false, // Disable logging for production
});

async function connectToDatabase() {
  try {
    // Sync models with the database (creates tables if they don't exist)
    await sequelize.sync();
    await sequelize.authenticate();
  } catch (error) {
    console.error('Error connecting to database:', error);
    throw error;
  }
}

export { sequelize, connectToDatabase };
