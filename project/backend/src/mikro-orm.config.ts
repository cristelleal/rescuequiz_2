import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import {
  Options,
  Platform,
  PostgreSqlDriver,
  TextType,
  Type,
} from '@mikro-orm/postgresql';
import UserEntity from './users/User.entity';
import { Migrator, TSMigrationGenerator } from '@mikro-orm/migrations';
import ScoreEntity from './scores/Score.entity';

const config: Options = {
  driver: PostgreSqlDriver,
  entities: [UserEntity, ScoreEntity],
  entitiesTs: ['src/**/*.entity.ts'],
  metadataProvider: TsMorphMetadataProvider,
  debug: true,
  dbName: 'postgres',
  user: 'postgres',
  password: 'root',
  host: 'localhost',
  port: 5432,
  migrations: {
    tableName: 'mikro_orm_migrations', // name of database table with log of executed transactions
    snapshot: false,
    path: 'dist/migrations',
    pathTs: './migrations',
    glob: '!(*.d).{js,ts}', // how to match migration files (all .js and .ts files, but not .d.ts)
    transactional: true, // wrap each migration in a transaction
    allOrNothing: false, // wrap all migrations in master transaction
    dropTables: true, // allow to disable table dropping
    safe: true, // allow to disable table and column dropping
    emit: 'ts', // migration generation mode
    generator: TSMigrationGenerator, // migration generator, e.g. to allow custom formatting
    disableForeignKeys: false, // allow to disable foreign key checks while schema updates
  },
  extensions: [Migrator],
  discovery: {
    getMappedType(type: string, platform: Platform) {
      // override the mapping for string properties only
      if (type === 'string') {
        return Type.getType(TextType);
      }

      return platform.getDefaultMappedType(type);
    },
  },
};

export default config;
