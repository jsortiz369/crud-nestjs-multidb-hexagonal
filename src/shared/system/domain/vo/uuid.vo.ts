import { InvalidUuidException } from '../exceptions';

const REGEX_UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export abstract class UuidValueObject {
  readonly _value: string;

  constructor(value: string, message: string) {
    this._value = value;
    this.isUuid(message); // Ensure the value is a valid UUID
  }

  private isUuid(message: string): void {
    if (typeof this._value !== 'string' || REGEX_UUID.test(this._value) === false) throw new InvalidUuidException(message);
    return;
  }
}
