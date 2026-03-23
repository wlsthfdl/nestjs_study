import { TypeOrmModuleOptions } from '@nestjs/typeorm';

function ormConfig(): TypeOrmModuleOptions {
  const commonConf = {
    SYNCHRONIZE: false,
    ENTITIES: [__dirname + '/domain/*.entity{.ts,.js}'],
    MIGRATIONS: [__dirname + '/migrations/**/*{.ts,.js}'],
    MIGRATIONS_RUN: false,
  };

  const ormConfig: TypeOrmModuleOptions = {
    type: 'mysql',
    host: 'localhost',
    port: 13306,
    username: 'root',
    password: 'root',
    database: 'test',
    entities: commonConf.ENTITIES,
    synchronize: commonConf.SYNCHRONIZE,
    logging: true,
    migrations: commonConf.MIGRATIONS,
    migrationsRun: commonConf.MIGRATIONS_RUN,
  };
  return ormConfig;
}

export { ormConfig };
