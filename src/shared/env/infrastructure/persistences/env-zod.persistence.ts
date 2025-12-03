import { config } from 'dotenv';
import { ZodSafeParseResult } from 'zod';

import { Env } from '../../domain/env.interface';
import { ZodEnvSchema } from '../schemas';
import { EnvRepository } from '../../domain/env.repository';

export class ZodEnvPersistence implements EnvRepository {
  private readonly _env: Env;
  private readonly _urlDataSource: string;

  /**
   * Creates an instance of ZodEnvPersistence.
   * @date 2025-12-03 06:30:20
   * @author Jogan Ortiz Muñoz
   *
   * @constructor
   */
  constructor() {
    const resultEnv = config({ path: `.env` });
    if (resultEnv?.error instanceof Error) throw new Error(`Could not find .env file`);
    const parsedConfig: ZodSafeParseResult<Env> = ZodEnvSchema.safeParse(resultEnv.parsed);
    if (parsedConfig.error && !parsedConfig.data) throw new Error(`${parsedConfig.error._zod.def.map((e) => e.message).join(', ')}`);
    this._env = parsedConfig.data;
    this._urlDataSource = this.dataUrlDB();
  }

  /**
   * @description Get environment variable by key
   * @date 2025-12-03 06:30:26
   * @author Jogan Ortiz Muñoz
   *
   * @template {keyof Env} T
   * @param {T} key
   * @returns {Env[T]}
   */
  get<T extends keyof Env>(key: T): Env[T] {
    this.validateKey(key);
    const value = this._env[key];
    return value;
  }

  /**
   * @description Get system variable by key
   * @date 2025-12-03 06:30:59
   * @author Jogan Ortiz Muñoz
   *
   * @template {string} T
   * @param {T} key
   * @returns {string}
   */
  getSystem<T extends string>(key: T): string {
    this.validateKey(key);
    return process.env[key] as string;
  }

  /**
   * @description Get url data source
   * @date 2025-12-03 06:31:17
   * @author Jogan Ortiz Muñoz
   *
   * @returns {string}
   */
  getUrlDataSource(): string {
    return this._urlDataSource;
  }

  /**
   * @description Validate key exist
   * @date 2025-12-03 06:31:28
   * @author Jogan Ortiz Muñoz
   *
   * @private
   * @template {string} T
   * @param {T} value
   * @returns {boolean}
   */
  private validateKey<T extends string>(value: T): boolean {
    if (value === undefined || value === null) throw new Error(`Key variable is not defined`);
    return true;
  }

  /**
   * @description Validate type database
   * @date 2025-12-03 06:31:36
   * @author Jogan Ortiz Muñoz
   *
   * @private
   * @returns {string}
   */
  private dataUrlDB(): string {
    const dbType = this._env['DB_TYPE'];
    const host = this._env['DB_HOST'];
    const port = this._env['DB_PORT'];
    const name = this._env['DB_NAME'];
    const username = this._env['DB_USERNAME'];
    const password = this._env['DB_PASSWORD'];

    let typeConect: string | undefined;
    if (dbType === 'sqlserver') {
      typeConect = `${dbType}://${host}:${port};database=${name};user=${username};password=${password};encrypt=true;trustServerCertificate=true`;
    } else if (dbType === 'postgresql' || dbType === 'mysql') {
      typeConect = `${dbType}://${username}:${password}@${host}:${port}/${name}`;
    }

    // validate has defined data source
    if (typeConect === null || typeConect === undefined) throw new Error(`Data source is not defined`);
    return typeConect;
  }
}
