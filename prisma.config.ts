import { defineConfig } from 'prisma/config';
import { ZodEnvPersistence } from './src/shared/env/infrastructure/persistences';

const _env = new ZodEnvPersistence();
const typedb = _env.get('DB_TYPE');
const typeConect = _env.getUrlDataSource();
process.env.DATABASE_URL = typeConect;

export default defineConfig({
  schema: `prisma/${typedb}/schema.prisma`,
  migrations: {
    path: `prisma/${typedb}/migrations`,
  },
  engine: 'classic',
  datasource: {
    url: typeConect,
  },
});
