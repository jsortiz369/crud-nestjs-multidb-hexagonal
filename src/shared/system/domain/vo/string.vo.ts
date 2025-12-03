import { InvalidValueException } from '../exceptions';

export abstract class StringValueObject<T extends string | undefined | null> {
  readonly _value: T;
  protected constructor(value: T, message: string) {
    this._value = value;
    this.isString(message); // Ensure the value is a string
  }

  protected ensureNotEmpty(message: string): void {
    if (this._value === '' || this._value?.trim() === '') throw new InvalidValueException(message);
  }

  protected ensureIsDefined(message: string): void {
    if (this._value === null || this._value === undefined) throw new InvalidValueException(message);
  }

  protected ensureIsFulfillRegExp(regex: RegExp, message: string): void {
    if (!regex.test(this._value ?? '')) throw new InvalidValueException(message);
  }

  protected length(min: number, max: number, message: string) {
    if (this.min(min) || this.max(max)) throw new InvalidValueException(message);
  }

  protected minLength(min: number, message: string) {
    if (this.min(min)) throw new InvalidValueException(message);
  }

  protected maxLength(max: number, message: string) {
    if (this.max(max)) throw new InvalidValueException(message);
  }

  private min(min: number): boolean {
    return this._value !== undefined && this._value !== null && this._value.length < min;
  }

  private max(limit: number): boolean {
    return this._value !== undefined && this._value !== null && this._value.length > limit;
  }

  private isString(message: string): void {
    if (this._value === null || this._value === undefined) return;
    if (typeof this._value !== 'string') throw new InvalidValueException(message);
    return;
  }
}
