module.exports = {
  type: 'postgres',
  host: 'db',
  port: 5432,
  username: 'postgres',
  password: 'docker',
  database: 'cursonestjs-db',
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/migrations/*.js'],
  migrationsTableName: 'custom_migration_table',
  cli: {
    migrationsDir: 'src/migrations',
  },
};
