import { BadRequestException } from '@nestjs/common';

export class InvalidValueException extends BadRequestException {
  constructor(message: string) {
    super(message);
  }
}
