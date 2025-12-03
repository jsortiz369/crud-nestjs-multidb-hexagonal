import { InvalidValueException } from '../exceptions';

export abstract class DateValueObject<T extends Date | undefined | null> {
  readonly _value: T;
  protected constructor(value: T, message: string) {
    this._value = value;
    this.isValidDate(message); // Ensure the value is a valid date
  }

  protected ensureIsDefined(message: string): void {
    if (this._value === null || this._value === undefined) throw new InvalidValueException(message);
  }

  protected min(min: Date, message: string) {
    if (this._value != undefined && this._value != null && this._value < min) throw new InvalidValueException(message);
  }

  protected max(max: Date, message: string) {
    if (this._value != undefined && this._value != null && this._value > max) throw new InvalidValueException(message);
  }

  private isValidDate(message: string): void {
    if (this._value === null || this._value === undefined) return;
    if (!(this._value instanceof Date) || isNaN(this._value?.getTime())) throw new InvalidValueException(message);
    return;
  }
}
