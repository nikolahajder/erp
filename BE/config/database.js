module.exports = ({ env }) => ({
  defaultConnection: 'default',
  connections: {
    default: {
      connector: 'mongoose',
      settings: {
        host: env('DATABASE_HOST', 'cluster0.kma6z.mongodb.net'),
        srv: env.bool('DATABASE_SRV', true),
        port: env.int('DATABASE_PORT', 27017),
        //database: env('DATABASE_NAME', 'Edita-tepisi'),
        database: env('DATABASE_NAME', 'mobilni-telefoni'),
        username: env('DATABASE_USERNAME', 'nikolahajder'),
        password: env('DATABASE_PASSWORD', 'projekat123'),
      },
      options: {
        authenticationDatabase: env('AUTHENTICATION_DATABASE', null),
        ssl: env.bool('DATABASE_SSL', true),
      },
    },
  },
});
