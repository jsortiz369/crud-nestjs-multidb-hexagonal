export abstract class UuidRepository {
  /**
   * @description Generate uuid
   * @date 2025-11-19 10:09:01
   * @author Jogan Ortiz Muñoz
   *
   * @abstract
   * @returns {string}
   */
  abstract generateUuid(): string;

  /**
   * @description Validate uuid
   * @date 2025-11-19 10:09:08
   * @author Jogan Ortiz Muñoz
   *
   * @abstract
   * @param {string} uuid
   * @returns {boolean}
   */
  abstract validateUuid(uuid: string): boolean;
}
