import { Env } from './env.interface';

export abstract class EnvRepository {
  /**
   * @description Get environment variable by key
   * @date 2025-11-19 06:10:33
   * @author Jogan Ortiz Muñoz
   *
   * @abstract
   * @template {keyof Env} T
   * @param {T} key
   * @returns {Env[T]}
   */
  abstract get<T extends keyof Env>(key: T): Env[T];

  /**
   * @description Get system variable by key
   * @date 2025-11-19 06:20:57
   * @author Jogan Ortiz Muñoz
   *
   * @abstract
   * @param {string} key
   * @returns {string}
   */
  abstract getSystem(key: string): string;

  /**
   * @description Get url data source
   * @date 2025-11-18 16:17:24
   * @author Jogan Ortiz Muñoz
   *
   * @abstract
   * @returns {string}
   */
  abstract getUrlDataSource(): string;
}
