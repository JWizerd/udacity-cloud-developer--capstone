import { TypeOrmModuleOptions } from '@nestjs/typeorm/dist/interfaces/typeorm-options.interface';

import { User } from '../users/user.entity';

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DATABASE_HOST || '127.0.0.1',
  port: 3306,
  username: process.env.DATABASE_USER || 'root',
  password: process.env.DATABASE_PASS || 'root',
  database: process.env.DATABASE_DB || 'udacity_uassigned_test',
  synchronize: process.env.NODE_ENV === 'development',
  bigNumberStrings: false,
  cache: true,
  entities: [User],
};
