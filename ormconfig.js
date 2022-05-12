const basicConfig = {
   type: process.env.DATABASE_CONNECTION,
   host: process.env.DATABASE_HOST,
   name: process.env.DATABASE_NAME,
   database: process.env.DATABASE_NAME,
   port: process.env.DATABASE_PORT,
   username: process.env.DATABASE_USERNAME,
   password: process.env.DATABASE_PASSWORD,
   synchronize: false,
   migrationsRun: true,
   logging: process.env.DATABASE_LOGGING === 'true',
   entities: [
      "src/entity/**/*.ts"
   ],
   migrations: [
      "src/migration/**/*.ts"
   ]
}

module.exports = basicConfig;
