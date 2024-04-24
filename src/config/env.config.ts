export const EnvConfiguration = () => ({
  environment: process.env.NODE_ENV || 'dev',
  mongodb: process.env.MONGODB,
  port: process.env.PORT || 3000,
  defaultLimit: process.env.DEFAULT_LIMIT || 10,
  defaultOffset: process.env.DEFAULT_OFFSET || 0,
  seedUrl: process.env.SEED_URL || 'https://pokeapi.co/api/v2/pokemon',
  seedItems: process.env.SEED_ITEMS || 650,
});
