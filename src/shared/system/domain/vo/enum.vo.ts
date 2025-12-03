import { InvalidValueException } from '../exceptions';

export abstract class EnumValueObject<T extends Record<string, any> | null | undefined> {
  readonly _value: T[keyof T];
  constructor(value: T[keyof T], enumType: Required<T>, message: string) {
    this._value = value;
    this.isEnum(enumType, message);
  }

  protected ensureIsDefined(message: string): void {
    if (this._value === null || this._value === undefined) throw new InvalidValueException(message);
  }

  private isEnum(enumType: Required<T>, message: string): void {
    if (this._value === null || this._value === undefined) return;
    if (!Object.values(enumType).includes(this._value)) throw new InvalidValueException(message);
  }
}
